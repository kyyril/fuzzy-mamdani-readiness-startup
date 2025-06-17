import React, { useState } from "react";
import { validationData } from "../data/validationData";
import { fuzzyInference } from "../utils/fuzzyLogic";
import { Play, CheckCircle, XCircle, BarChart3 } from "lucide-react";

export const ValidationTest: React.FC = () => {
  const [testResults, setTestResults] = useState<any[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentTest, setCurrentTest] = useState(0);

  const runValidation = async () => {
    setIsRunning(true);
    setTestResults([]);
    setCurrentTest(0);

    const results = [];

    for (let i = 0; i < validationData.length; i++) {
      setCurrentTest(i + 1);

      // Simulate processing delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 100));

      const testCase = validationData[i];
      const result = fuzzyInference(testCase.data);

      const isValid =
        result.crispOutput >= testCase.expectedRange[0] &&
        result.crispOutput <= testCase.expectedRange[1];

      results.push({
        ...testCase,
        actualOutput: result.crispOutput,
        recommendation: result.recommendation,
        isValid,
        deviation: isValid
          ? 0
          : Math.min(
              Math.abs(result.crispOutput - testCase.expectedRange[0]),
              Math.abs(result.crispOutput - testCase.expectedRange[1])
            ),
      });
    }

    setTestResults(results);
    setIsRunning(false);
    setCurrentTest(0);
  };

  const validCount = testResults.filter((r) => r.isValid).length;
  const accuracy =
    testResults.length > 0 ? (validCount / testResults.length) * 100 : 0;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Validasi Sistem
        </h2>
        <p className="text-gray-600">
          Uji validitas sistem menggunakan 31 kasus uji yang telah disiapkan
          untuk memastikan akurasi sistem pakar.
        </p>
      </div>

      {/* Test Controls */}
      <div className="mb-6">
        <button
          onClick={runValidation}
          disabled={isRunning}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            isRunning
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          <Play className="h-4 w-4" />
          <span>
            {isRunning
              ? `Menguji ${currentTest}/${validationData.length}...`
              : "Jalankan Validasi"}
          </span>
        </button>
      </div>

      {/* Progress Bar */}
      {isRunning && (
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${(currentTest / validationData.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      )}

      {/* Results Summary */}
      {testResults.length > 0 && (
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">
              {validCount}
            </div>
            <div className="text-sm text-green-700">Test Valid</div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <XCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-red-600">
              {testResults.length - validCount}
            </div>
            <div className="text-sm text-red-700">Test Gagal</div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <BarChart3 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">
              {accuracy.toFixed(1)}%
            </div>
            <div className="text-sm text-blue-700">Akurasi</div>
          </div>
        </div>
      )}

      {/* Detailed Results */}
      {testResults.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Detail Hasil Validasi</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Test
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Deskripsi
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Expected
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Actual
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Rekomendasi
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {testResults.map((result, index) => (
                  <tr
                    key={index}
                    className={result.isValid ? "bg-green-50" : "bg-red-50"}
                  >
                    <td className="px-4 py-2 text-sm font-medium">
                      #{index + 1}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600">
                      {result.description}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      {result.expectedRange[0]} - {result.expectedRange[1]}
                    </td>
                    <td className="px-4 py-2 text-sm font-medium">
                      {result.actualOutput.toFixed(1)}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      {result.recommendation}
                    </td>
                    <td className="px-4 py-2">
                      {result.isValid ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
