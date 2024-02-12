import React, { useState } from 'react';
import styled from 'styled-components';

// Liste elemanları için tip
type MenuItem = {
  title: string;
  action: () => void;
};

// MenuButton componenti için props tipi
type MenuButtonProps = {
  onClick: () => void;
};

// MenuList componenti için props tipi
type MenuListProps = {
  items: MenuItem[];
};

// MenuButton bileşeni
const MenuButton = ({ onClick }: MenuButtonProps) => {
  return <Button onClick={onClick}>Menu</Button>;
};

// MenuList bileşeni
const MenuList = ({ items }: MenuListProps) => {
  return (
    <ListContainer>
      {items.map((item, index) => (
        <ListItem key={index} onClick={item.action}>
          {item.title}
        </ListItem>
      ))}
    </ListContainer>
  );
};

// Ana Menü bileşeni
const MenuMain: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems: MenuItem[] = [
    { title: 'Action 1', action: () => console.log('Action 1 clicked') },
    { title: 'Action 2', action: () => console.log('Action 2 clicked') },
    { title: 'Action 3', action: () => console.log('Action 3 clicked') },
  ];

  return (
    <MenuContainer>
      <MenuButton onClick={toggleMenu} />
      {isOpen && <MenuList items={menuItems} />}
    </MenuContainer>
  );
};

// Stiller
const MenuContainer = styled.div`
  position: relative;
`;

const Button = styled.button`
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
`;

const ListContainer = styled.div`
  position: absolute;
  top: 40px; /* MenuButton'dan gelen boşluk */
  left: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ListItem = styled.div`
  padding: 8px 16px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export default MenuMain;
