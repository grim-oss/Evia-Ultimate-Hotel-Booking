import { ReactNode } from 'react';

interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => ReactNode);
}

interface Props<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
}

export default function DataTable<T extends { id: string }>({
  columns,
  data,
  isLoading,
}: Props<T>) {
  if (isLoading) return <div className="p-4 text-center">Loading...</div>;

  return (
    <div className="bg-white rounded shadow overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col, i) => (
              <th
                key={i}
                className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row) => (
            <tr key={row.id}>
              {columns.map((col, i) => (
                <td key={i} className="px-6 py-4 whitespace-nowrap">
                  {typeof col.accessor === 'function'
                    ? col.accessor(row)
                    : (row[col.accessor] as ReactNode)}
                </td>
              ))}
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-6 py-4 text-center text-muted">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}