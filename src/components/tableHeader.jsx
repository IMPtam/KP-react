import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ onSort, selectedSort, columns }) => {
    // const [sortIcon, setSortIcon] = useState(" ");
    // useEffect(() => {
    //     console.log("нажал");
    //     if (selectedSort.path) setSortIcon("bi bi-caret-down-fill");
    // }, [selectedSort]);
    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc" : "asc"
            });
        } else {
            onSort({ path: item, order: "asc" });
        }
    };
    const handleIcon = () => {
        if (selectedSort.order === "asc") {
            return "bi bi-caret-down-fill";
        } else {
            return "bi bi-caret-up-fill";
        }
    };
    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th
                        key={column}
                        className={
                            selectedSort.path === columns[column].path &&
                            columns[column].path
                                ? handleIcon()
                                : ""
                        }
                        // {...{ className: columns[column].path && sortIcon }}
                        onClick={
                            columns[column].path
                                ? () => handleSort(columns[column].path)
                                : undefined
                        }
                        {...{ role: columns[column].path && "button" }}
                        scope="col"
                    >
                        {columns[column].name}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired,
    sortIcon: PropTypes.string
};
export default TableHeader;
