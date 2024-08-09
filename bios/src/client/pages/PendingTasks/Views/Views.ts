import styled from "styled-components";

const img = encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 1500'><rect fill='#ffffff' width='2000' height='1500'/><defs><rect  stroke='#ffffff' stroke-width='0.3' width='1' height='1' id='s'/><pattern id='a' width='3' height='3' patternUnits='userSpaceOnUse' patternTransform='scale(30.6) translate(-967.32 -725.49)'><use  fill='#fcfcfc' href='#s' y='2'/><use  fill='#fcfcfc' href='#s' x='1' y='2'/><use  fill='#fafafa' href='#s' x='2' y='2'/><use  fill='#fafafa' href='#s'/><use  fill='#f7f7f7' href='#s' x='2'/><use  fill='#f7f7f7' href='#s' x='1' y='1'/></pattern><pattern id='b' width='7' height='11' patternUnits='userSpaceOnUse' patternTransform='scale(30.6) translate(-967.32 -725.49)'><g  fill='#f5f5f5'><use href='#s'/><use href='#s' y='5' /><use href='#s' x='1' y='10'/><use href='#s' x='2' y='1'/><use href='#s' x='2' y='4'/><use href='#s' x='3' y='8'/><use href='#s' x='4' y='3'/><use href='#s' x='4' y='7'/><use href='#s' x='5' y='2'/><use href='#s' x='5' y='6'/><use href='#s' x='6' y='9'/></g></pattern><pattern id='h' width='5' height='13' patternUnits='userSpaceOnUse' patternTransform='scale(30.6) translate(-967.32 -725.49)'><g  fill='#f5f5f5'><use href='#s' y='5'/><use href='#s' y='8'/><use href='#s' x='1' y='1'/><use href='#s' x='1' y='9'/><use href='#s' x='1' y='12'/><use href='#s' x='2'/><use href='#s' x='2' y='4'/><use href='#s' x='3' y='2'/><use href='#s' x='3' y='6'/><use href='#s' x='3' y='11'/><use href='#s' x='4' y='3'/><use href='#s' x='4' y='7'/><use href='#s' x='4' y='10'/></g></pattern><pattern id='c' width='17' height='13' patternUnits='userSpaceOnUse' patternTransform='scale(30.6) translate(-967.32 -725.49)'><g  fill='#f2f2f2'><use href='#s' y='11'/><use href='#s' x='2' y='9'/><use href='#s' x='5' y='12'/><use href='#s' x='9' y='4'/><use href='#s' x='12' y='1'/><use href='#s' x='16' y='6'/></g></pattern><pattern id='d' width='19' height='17' patternUnits='userSpaceOnUse' patternTransform='scale(30.6) translate(-967.32 -725.49)'><g  fill='#ffffff'><use href='#s' y='9'/><use href='#s' x='16' y='5'/><use href='#s' x='14' y='2'/><use href='#s' x='11' y='11'/><use href='#s' x='6' y='14'/></g><g  fill='#efefef'><use href='#s' x='3' y='13'/><use href='#s' x='9' y='7'/><use href='#s' x='13' y='10'/><use href='#s' x='15' y='4'/><use href='#s' x='18' y='1'/></g></pattern><pattern id='e' width='47' height='53' patternUnits='userSpaceOnUse' patternTransform='scale(30.6) translate(-967.32 -725.49)'><g  fill='#FFFFFF'><use href='#s' x='2' y='5'/><use href='#s' x='16' y='38'/><use href='#s' x='46' y='42'/><use href='#s' x='29' y='20'/></g></pattern><pattern id='f' width='59' height='71' patternUnits='userSpaceOnUse' patternTransform='scale(30.6) translate(-967.32 -725.49)'><g  fill='#FFFFFF'><use href='#s' x='33' y='13'/><use href='#s' x='27' y='54'/><use href='#s' x='55' y='55'/></g></pattern><pattern id='g' width='139' height='97' patternUnits='userSpaceOnUse' patternTransform='scale(30.6) translate(-967.32 -725.49)'><g  fill='#FFFFFF'><use href='#s' x='11' y='8'/><use href='#s' x='51' y='13'/><use href='#s' x='17' y='73'/><use href='#s' x='99' y='57'/></g></pattern></defs><rect fill='url(#a)' width='100%' height='100%'/><rect fill='url(#b)' width='100%' height='100%'/><rect fill='url(#h)' width='100%' height='100%'/><rect fill='url(#c)' width='100%' height='100%'/><rect fill='url(#d)' width='100%' height='100%'/><rect fill='url(#e)' width='100%' height='100%'/><rect fill='url(#f)' width='100%' height='100%'/><rect fill='url(#g)' width='100%' height='100%'/></svg>")
const bg = `url("data:image/svg+xml,${img}")`;
export const BackgroundDiv = styled.div`
  width: 100%;
  height: calc(100vh - 90px);
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.40)), ${bg};
  background-size: cover;
  background-repeat: no-repeat;
`;


export const WelcomeText = styled.div`
    font-size: 16px;
    font-weight: 600;
    padding: 10px;
`;

export const PendingTasksDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 10px;
    gap: 10px;
    
`;

export const ToggleDiv = styled.div<{ isExpanded: boolean }>`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 5 10px;
    box-shadow: ${({ isExpanded }) => isExpanded ? '0 0 3px 0 rgb(0 0 0 / 15%)' : '0 0 2px 0 rgb(0 0 0 / 15%)'};
    border-radius: 5px;
    height: ${({ isExpanded }) => isExpanded ? '400px' : '40px'};
    overflow-y: ${({ isExpanded }) => isExpanded ? 'scroll' : 'hidden'};
    transition: height 0.5s ease, box-shadow 0.5s ease;
    align-items: ${({ isExpanded }) => isExpanded ? 'flex-start' : 'center'};
    background-color: rgba(29, 82, 145, 0.01);
    `;

export const ToggleDivHeader = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 5px;
    align-items: center;
    border-bottom: 1px solid #f0f0f0;
    &:hover {
        cursor: pointer;
    }
`;

export const TaskList = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 10px;
    gap: 5px;
`;

export const ListItem = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    transition: color 0.3s ease;
    &:hover {
        color: #346eeb;
    }
`;