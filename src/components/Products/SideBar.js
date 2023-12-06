import React, { useState } from 'react';
import { IoIosRemoveCircle, IoMdAddCircle } from 'react-icons/io';
import { SideBarCategory } from '../../server/ApiSideBarCategory'

const SidebarCategory = ({ category, isOpen, onToggle }) => {
  const { title, icon, subcategories } = category;
  return (
    <li className="sidebar-menu-category">
      <button className="sidebar-accordion-menu" data-accordion-btn>
        <div className="menu-title-flex">
          <img src={icon} alt={title} width="20" height="20" className="menu-title-img" />
          <p className="menu-title">{title}</p>
        </div>
        <div>
          {isOpen ? (
            <IoIosRemoveCircle onClick={onToggle} />
          ) : (
            <IoMdAddCircle onClick={onToggle} />
          )}
        </div>
      </button>

      <ul
        className={
          isOpen
            ? 'sidebar-submenu-category-list-active'
            : 'sidebar-submenu-category-list'
        }
        data-accordion
      >
        {subcategories.map((subCategory) => (
          <li key={subCategory.title} className="sidebar-submenu-category">
            <a href="#" className="sidebar-submenu-title">
              <p className="product-name">{subCategory.title}</p>
              <data value={subCategory.stock} className="stock" title="Available Stock">
                {subCategory.stock}
              </data>
            </a>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default function SideBar() {
  const [openSideMenuCategoryList, setOpenSideMenuCategoryList] = useState('');
  return (
    <>
      <ul className="sidebar-menu-category-list">
        {SideBarCategory.map((category) => (
          <SidebarCategory
            key={category.id}
            category={category}
            isOpen={openSideMenuCategoryList === category.title}
            onToggle={() =>
              setOpenSideMenuCategoryList((prev) =>
                prev === category.title ? '' : category.title
              )
            }
          />
        ))}
      </ul>
    </>
  )
}
