import styled from 'styled-components'
import { Resources } from '../assets/Resources';

export const NavbarDiv = styled.div`
  box-shadow: 5px 0 10px -5px #3ba2ee;
  width: 290px;
  min-width: 290px;
  max-width: 290px;
  height: 100%;
  justify-items: start;
  align-items: center;
  justify-content: start;
  display: flex;
  flex-direction: column;
  position: fixed;
  flex-shrink: 0;
  top: 0;
  left: 0;
`

export const PortalMenuLink = styled.a<{ selected: boolean }>`
  display: flex;
  align-items: center;
  flex-direction: row;
  cursor: pointer;
  height: 45px;
  width: 254px;
  border-radius: .5rem;
  padding-left: 0.8rem;
  margin-top: 0.2rem;
  margin-left: 0.2rem;
  text-decoration: none;
  transition: all .2s ease-in-out;
  background-color: ${props => props.selected ? Resources.Colors.themeColor : ''};
  color: ${props => props.selected ? 'white' : Resources.Colors.themeColor};
  box-shadow: ${props => props.selected ? `0 0 #0000, 0 0 #0000, 0 0 #0000, 0 0 #0000, 0 4px 6px -1px ${Resources.Colors.themeColor}, 0 2px 4px -2px ${Resources.Colors.themeColor}` : ''};
  &:hover {
    background-color: ${Resources.Colors.themeColor};
    color: white;
    box-shadow: 0 0 #0000, 0 0 #0000, 0 0 #0000, 0 0 #0000, 0 4px 6px -1px ${Resources.Colors.themeColor}, 0 2px 4px -2px ${Resources.Colors.themeColor};
  }
`