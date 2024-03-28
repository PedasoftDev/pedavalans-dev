import styled from "styled-components";
import { Resources } from "../../assets/Resources";

const svgBackground = encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 1500'><rect fill='#ffffff' width='2000' height='1500'/><defs><rect  stroke='#ffffff' stroke-width='0.3' width='1' height='1' id='s'/><pattern id='a' width='3' height='3' patternUnits='userSpaceOnUse' patternTransform='scale(23.75) translate(-957.89 -718.42)'><use  fill='#fcfcfc' href='#s' y='2'/><use  fill='#fcfcfc' href='#s' x='1' y='2'/><use  fill='#fafafa' href='#s' x='2' y='2'/><use  fill='#fafafa' href='#s'/><use  fill='#f7f7f7' href='#s' x='2'/><use  fill='#f7f7f7' href='#s' x='1' y='1'/></pattern><pattern id='b' width='7' height='11' patternUnits='userSpaceOnUse' patternTransform='scale(23.75) translate(-957.89 -718.42)'><g  fill='#f5f5f5'><use href='#s'/><use href='#s' y='5' /><use href='#s' x='1' y='10'/><use href='#s' x='2' y='1'/><use href='#s' x='2' y='4'/><use href='#s' x='3' y='8'/><use href='#s' x='4' y='3'/><use href='#s' x='4' y='7'/><use href='#s' x='5' y='2'/><use href='#s' x='5' y='6'/><use href='#s' x='6' y='9'/></g></pattern><pattern id='h' width='5' height='13' patternUnits='userSpaceOnUse' patternTransform='scale(23.75) translate(-957.89 -718.42)'><g  fill='#f5f5f5'><use href='#s' y='5'/><use href='#s' y='8'/><use href='#s' x='1' y='1'/><use href='#s' x='1' y='9'/><use href='#s' x='1' y='12'/><use href='#s' x='2'/><use href='#s' x='2' y='4'/><use href='#s' x='3' y='2'/><use href='#s' x='3' y='6'/><use href='#s' x='3' y='11'/><use href='#s' x='4' y='3'/><use href='#s' x='4' y='7'/><use href='#s' x='4' y='10'/></g></pattern><pattern id='c' width='17' height='13' patternUnits='userSpaceOnUse' patternTransform='scale(23.75) translate(-957.89 -718.42)'><g  fill='#f2f2f2'><use href='#s' y='11'/><use href='#s' x='2' y='9'/><use href='#s' x='5' y='12'/><use href='#s' x='9' y='4'/><use href='#s' x='12' y='1'/><use href='#s' x='16' y='6'/></g></pattern><pattern id='d' width='19' height='17' patternUnits='userSpaceOnUse' patternTransform='scale(23.75) translate(-957.89 -718.42)'><g  fill='#ffffff'><use href='#s' y='9'/><use href='#s' x='16' y='5'/><use href='#s' x='14' y='2'/><use href='#s' x='11' y='11'/><use href='#s' x='6' y='14'/></g><g  fill='#efefef'><use href='#s' x='3' y='13'/><use href='#s' x='9' y='7'/><use href='#s' x='13' y='10'/><use href='#s' x='15' y='4'/><use href='#s' x='18' y='1'/></g></pattern><pattern id='e' width='47' height='53' patternUnits='userSpaceOnUse' patternTransform='scale(23.75) translate(-957.89 -718.42)'><g  fill='#3BA2EE'><use href='#s' x='2' y='5'/><use href='#s' x='16' y='38'/><use href='#s' x='46' y='42'/><use href='#s' x='29' y='20'/></g></pattern><pattern id='f' width='59' height='71' patternUnits='userSpaceOnUse' patternTransform='scale(23.75) translate(-957.89 -718.42)'><g  fill='#3BA2EE'><use href='#s' x='33' y='13'/><use href='#s' x='27' y='54'/><use href='#s' x='55' y='55'/></g></pattern><pattern id='g' width='139' height='97' patternUnits='userSpaceOnUse' patternTransform='scale(23.75) translate(-957.89 -718.42)'><g  fill='#3BA2EE'><use href='#s' x='11' y='8'/><use href='#s' x='51' y='13'/><use href='#s' x='17' y='73'/><use href='#s' x='99' y='57'/></g></pattern></defs><rect fill='url(#a)' width='100%' height='100%'/><rect fill='url(#b)' width='100%' height='100%'/><rect fill='url(#h)' width='100%' height='100%'/><rect fill='url(#c)' width='100%' height='100%'/><rect fill='url(#d)' width='100%' height='100%'/><rect fill='url(#e)' width='100%' height='100%'/><rect fill='url(#f)' width='100%' height='100%'/><rect fill='url(#g)' width='100%' height='100%'/></svg>`);
export const bgImage = `url("data:image/svg+xml,${svgBackground}")`;
const customLogo = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTA4MCIgem9vbUFuZFBhbj0ibWFnbmlmeSIgdmlld0JveD0iMCAwIDgxMCA4MDkuOTk5OTkzIiBoZWlnaHQ9IjEwODAiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiIHZlcnNpb249IjEuMCI+PHBhdGggZmlsbD0iIzFkNTI5MSIgZD0iTSAyNzYuMjkyOTY5IDEyMC42MTcxODggQyAyNjEuMTIxMDk0IDEyMi44MTI1IDIzNy4zNTE1NjIgMTM0Ljg3ODkwNiAyMjQuNTU0Njg4IDE0Ni43NjE3MTkgQyAyMTIuMTI1IDE1OC4yNzczNDQgMjAxLjUxOTUzMSAxNzUuMDk3NjU2IDE5Ni41ODU5MzggMTkxLjczNDM3NSBDIDE5Mi45Mjk2ODggMjAzLjQzMzU5NCAxOTIuOTI5Njg4IDIwOS4xMDE1NjIgMTkzLjI5Mjk2OSA0NzAuODk0NTMxIEwgMTkzLjg0Mzc1IDczNy45OTIxODggTCAyMzMuMTQ4NDM4IDY5MC4yNzczNDQgQyAyNTQuNzIyNjU2IDY2NC4xMzI4MTIgMjgzLjk3MjY1NiA2MjguODUxNTYyIDI5Ny44NjcxODggNjExLjg0NzY1NiBMIDMyMy4yNzczNDQgNTgxLjEzNjcxOSBMIDQwOC40Njg3NSA1ODEuMTM2NzE5IEwgNDA5LjAxOTUzMSA1NjAuNDc2NTYyIEMgNDA5LjM4MjgxMiA1NDkuMzI0MjE5IDQwOS4zODI4MTIgNTI4LjY2Nzk2OSA0MDkuMDE5NTMxIDUxNC43NzM0MzggTCA0MDguNDY4NzUgNDg5LjcyNjU2MiBMIDI4NC4zMzU5MzggNDg5LjcyNjU2MiBMIDI4NC4zMzU5MzggMjE1LjUgTCAyODguNTQyOTY5IDIxMi43NTc4MTIgQyAyOTIuMzgyODEyIDIxMC4zODI4MTIgMzA5LjE5OTIxOSAyMTAuMDE1NjI1IDQyOC4wMzEyNSAyMTAuMzgyODEyIEwgNTYzLjEzMjgxMiAyMTAuOTI5Njg4IEwgNTYzLjY4MzU5NCAyNzMuNDUzMTI1IEwgNTY0LjA0Njg3NSAzMzYuMTYwMTU2IEwgNjU1LjQ1NzAzMSAzMzYuMTYwMTU2IEwgNjU1LjQ1NzAzMSAxMTguNjA1NDY5IEwgNDcxLjM1OTM3NSAxMTguNzg5MDYyIEMgMzY5Ljg5NDUzMSAxMTguOTcyNjU2IDI4Mi4zMjgxMjUgMTE5LjcwMzEyNSAyNzYuMjkyOTY5IDEyMC42MTcxODggWiBNIDI3Ni4yOTI5NjkgMTIwLjYxNzE4OCAiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZmlsbD0iIzFkNTI5MSIgZD0iTSAzNzEuOTA2MjUgMjk1LjAyNzM0NCBDIDM2My42Nzk2ODggMjk5LjQxNDA2MiAzNjIuOTQ5MjE5IDMwNS40NDUzMTIgMzYyLjk0OTIxOSAzNjAuMTA5Mzc1IEwgMzYyLjk0OTIxOSA0MTEuMTEzMjgxIEwgNDczLjAwMzkwNiA0MTEuMTEzMjgxIEwgNDc4LjMwNDY4OCA0MDUuODEyNSBMIDQ4My42MDkzNzUgNDAwLjUxMTcxOSBMIDQ4My42MDkzNzUgMjkyLjI4NTE1NiBMIDQzMC4yMjY1NjIgMjkyLjI4NTE1NiBDIDM4Ny4yNjE3MTkgMjkyLjQ2NDg0NCAzNzUuNzQ2MDk0IDI5My4wMTU2MjUgMzcxLjkwNjI1IDI5NS4wMjczNDQgWiBNIDM3MS45MDYyNSAyOTUuMDI3MzQ0ICIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBmaWxsPSIjMWQ1MjkxIiBkPSJNIDU2NC4wNDY4NzUgNDI0LjQ2MDkzOCBDIDU2NC4wNDY4NzUgNDc5LjQ4ODI4MSA1NjMuODYzMjgxIDQ4My44NzUgNTYwLjc1NzgxMiA0ODYuNjE3MTg4IEMgNTU3LjY0ODQzOCA0ODkuMzU5Mzc1IDU1MC43MDMxMjUgNDg5LjcyNjU2MiA0OTcuNjgzNTk0IDQ4OS43MjY1NjIgTCA0MzcuOTAyMzQ0IDQ4OS43MjY1NjIgTCA0MzcuOTAyMzQ0IDU4MS4xMzY3MTkgTCA1MDAuNjA5Mzc1IDU4MS4xMzY3MTkgQyA1MzcuMTcxODc1IDU4MS4xMzY3MTkgNTY3Ljg4NjcxOSA1ODAuNDAyMzQ0IDU3NC4yODUxNTYgNTc5LjEyNSBDIDYwMS41MjczNDQgNTc0LjE4NzUgNjMxLjY5MTQwNiA1NTEuMzM1OTM4IDY0My45Mzc1IDUyNi4xMDU0NjkgQyA2NTQuNTQyOTY5IDUwNC41MzUxNTYgNjU1LjQ1NzAzMSA0OTcuNDA2MjUgNjU1LjQ1NzAzMSA0MjcuOTMzNTk0IEwgNjU1LjQ1NzAzMSAzNjUuNDEwMTU2IEwgNTY0LjA0Njg3NSAzNjUuNDEwMTU2IFogTSA1NjQuMDQ2ODc1IDQyNC40NjA5MzggIiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0ibm9uemVybyIvPjwvc3ZnPg=="

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background-image: ${bgImage};
    background-size: cover;
    background-position: center;    
`;

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 400px;
    min-width: 100px;
    min-height: 200px;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.35);
    padding: 20px;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
`;

const LoginLabel = styled.div`
    font-size: 30px;
    font-weight: 600;
    color: ${Resources.Colors.themeColor};
    letter-spacing: 1px;
`;

const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 100%;
    height: 100%;
`;

const LoginInput = styled.input`
    width: 100%;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #ccc;
    padding: 0 10px;
    font-size: 16px;
    outline: none;
    &:focus {
        border-color: #3BA2EE;
    }
`;

const LoginButton = styled.button`
    width: 100%;
    height: 40px;
    border-radius: 5px;
    padding: 0 10px;
    font-size: 16px;
    outline: none;
    border: none;
    background-color: #3BA2EE;
    cursor: pointer;
    color: white;
    transition: 0.3s;
    &:hover {
        background-color: rgba(95,168,223);
    }
`;

const LoginError = styled.div`
    color: red;
    font-size: 12px;
`;

const LoginToSignUp = styled.div`
    color: #3BA2EE;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
        color: rgba(95,168,223);
    }
`;

export { customLogo, Container, LoginContainer, Header, LoginLabel, LoginForm, LoginInput, LoginButton, LoginError, LoginToSignUp };