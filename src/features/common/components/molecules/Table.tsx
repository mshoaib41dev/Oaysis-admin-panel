import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../atoms/table";
import { cn } from "../../utils";

export interface Header {
  key: string;
  label: string;
}

export interface GenericTableProps<T> {
  headers: Header[];
  data: T[];
  renderRow: (row: T) => React.ReactNode;
  className?: string;
}

export function CommonTable<T>({
  headers,
  data,
  renderRow,
  className,
}: GenericTableProps<T>) {
  return (
    <div
      className={cn(
        "border rounded-lg overflow-auto h-[calc(100vh-250px)] no-scrollbar",
        className
      )}
    >
      <Table className="w-full border-collapse">
        <TableHeader className="bg-gray-100">
          <TableRow>
            {headers.map((header) => (
              <TableHead
                key={header.key}
                className={`p-2 text-left border-b ${
                  header.label === "Actions" ? "text-center" : ""
                }`}
              >
                {header.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((row, index) => (
            <TableRow key={index} className="border-b">
              {renderRow(row)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
