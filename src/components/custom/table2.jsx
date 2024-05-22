import React, { useState } from "react";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { SlRefresh } from "react-icons/sl";
import { FaCirclePlus } from "react-icons/fa6";

export function DataTableDemo({ data, columns, type, SetisOpen }) {
    const [columnFilters, setColumnFilters] = useState([]);


    const table = useReactTable({
        data,
        columns,
        initialState: {
            pagination: {
                pageIndex: 0,
                pageSize: 6,
            },
        },
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            columnFilters,
        },
    });

    console.log(table.getRowModel().rows?.length)

    const HandleOpen = () => {
        SetisOpen(true);
    };

    return (
        <div className="w-full ">
            <div className="flex items-center py-4 justify-between px-4 border-b-[1px]">
                <div className="flex items-center gap-10 w-5/12">
                    <h1 className="text-2xl font-medium ml-5">{type}</h1>
                    <Input
                        placeholder="Filter NAMES..."
                        value={
                            (table.getColumn("name")?.getFilterValue() ) ??
                            ""
                        }
                        onChange={(event) =>
                            table.getColumn("name")?.setFilterValue(
                                event.target.value
                            )
                        }
                        className="max-w-sm  border-none outline-none bg-slate-100"
                    />
                </div>
                <div className="flex justify-between gap-3">
                    <SlRefresh className="h-6 w-6 cursor-pointer text-blue-600" />
                    <FaCirclePlus
                        className="h-6 w-6 cursor-pointer text-blue-600"
                        onClick={HandleOpen}
                    />
                </div>
            </div>
            <div className="w-full p-0 ">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                console.log(cell.getContext()),
                                                cell.column.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4 px-4 border-t-[1px] rounded-md">
                <div className="flex-1 text-sm text-muted-foreground">
                    page {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DataTableDemo;
