import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../services/Axios';
import * as XLSX from 'xlsx';

export default function UploadAndDistribute() {
  const { token } = useAuth();

  const [selectedFile, setSelectedFile] = useState(null);
  const [parsedData, setParsedData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const allowedTypes = [
    'text/csv',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file || !allowedTypes.includes(file.type)) {
      setError('Only CSV, XLSX or XLS files are allowed.');
      setSelectedFile(null);
      setParsedData([]);
      setHeaders([]);
      return;
    }

    setError('');
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      const keys = json[0];
      const values = json.slice(1).map((row) => {
        const entry = {};
        keys.forEach((key, idx) => {
          entry[key] = row[idx] || '';
        });
        return entry;
      });

      setHeaders(keys);
      setParsedData(values);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      await API.post('/lists/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setSelectedFile(null);
      setParsedData([]);
      setHeaders([]);
      setSuccessMessage('List uploaded and distributed successfully!');
    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to upload list.';
      setError(msg);
    } finally {
      setUploading(false);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setParsedData([]);
    setHeaders([]);
    setError('');
    setSuccessMessage('');
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <div className="w-full">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-6xl">
        <h2 className="text-2xl font-bold mb-6">Upload and Distribute List</h2>

        <div className="mb-4">
          <input
            type="file"
            accept=".csv, .xlsx, .xls"
            onChange={handleFileChange}
            className="border border-gray-500 rounded-md px-4 py-2 text-sm w-full max-w-xs"
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {successMessage && (
          <p className="text-green-600 text-sm mb-3">{successMessage}</p>
        )}

        {parsedData.length > 0 && (
          <div className="overflow-auto mb-6 max-h-[60vh] border rounded-lg">
            <table className="min-w-full table-fixed text-sm border border-gray-200">
              <thead className="bg-gray-100 sticky top-0 z-10 text-gray-700 border-b border-gray-300">
                <tr>
                  {headers.map((header, idx) => (
                    <th
                      key={idx}
                      className="px-4 py-3 text-center font-semibold border-r last:border-none"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {parsedData.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="bg-white hover:bg-gray-50 border-b border-gray-200"
                  >
                    {headers.map((header, colIndex) => (
                      <td
                        key={colIndex}
                        className="px-4 py-2 text-center border-r last:border-none"
                      >
                        {row[header] || '-'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {parsedData.length > 0 && (
          <div className="flex gap-4">
            <button
              onClick={handleUpload}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md"
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Upload & Distribute'}
            </button>

            <button
              onClick={handleClear}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-6 py-2 rounded-md"
            >
              Clear
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
