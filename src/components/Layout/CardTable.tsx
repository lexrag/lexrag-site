interface CardTableProps {
    title: string;
    children?: React.ReactNode;
}

const CardTable = ({title, children}: CardTableProps) => {
    return (
        <div className="card min-w-full">
            <div className="card-header">
                <h3 className="card-title">{title}</h3>
            </div>

            <div className="card-table scrollable-x-auto pb-3">
                <table className="table align-middle text-sm text-gray-500">
                    <tbody>
                        {children}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CardTable;
