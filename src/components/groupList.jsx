import React from "react";
import PropTypes from "prop-types";

const GroupList = ({
    items,
    valueProperty,
    contentProperty,
    onItemSelect,
    selectedItem
}) => {
    const itemsType = Array.isArray(items) ? { ...[...items] } : items;

    return (
        <ul className="list-group">
            {Object.keys(itemsType).map((item) => (
                <li
                    className={
                        "list-group-item" +
                        (itemsType[item] === selectedItem ? " active" : "")
                    }
                    key={itemsType[item][valueProperty]}
                    onClick={() => onItemSelect(itemsType[item][valueProperty])}
                >
                    {itemsType[item][contentProperty]}
                </li>
            ))}
        </ul>
    );
};
GroupList.defaultProps = {
    contentProperty: "name",
    valueProperty: "_id"
};
GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func,
    selectedItem: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};
export default GroupList;
