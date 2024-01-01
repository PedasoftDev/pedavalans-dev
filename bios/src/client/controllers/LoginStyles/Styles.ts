import styled from "styled-components";

const svgBackground = encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 1500'><rect fill='#ffffff' width='2000' height='1500'/><defs><rect  stroke='#ffffff' stroke-width='0.3' width='1' height='1' id='s'/><pattern id='a' width='3' height='3' patternUnits='userSpaceOnUse' patternTransform='scale(23.75) translate(-957.89 -718.42)'><use  fill='#fcfcfc' href='#s' y='2'/><use  fill='#fcfcfc' href='#s' x='1' y='2'/><use  fill='#fafafa' href='#s' x='2' y='2'/><use  fill='#fafafa' href='#s'/><use  fill='#f7f7f7' href='#s' x='2'/><use  fill='#f7f7f7' href='#s' x='1' y='1'/></pattern><pattern id='b' width='7' height='11' patternUnits='userSpaceOnUse' patternTransform='scale(23.75) translate(-957.89 -718.42)'><g  fill='#f5f5f5'><use href='#s'/><use href='#s' y='5' /><use href='#s' x='1' y='10'/><use href='#s' x='2' y='1'/><use href='#s' x='2' y='4'/><use href='#s' x='3' y='8'/><use href='#s' x='4' y='3'/><use href='#s' x='4' y='7'/><use href='#s' x='5' y='2'/><use href='#s' x='5' y='6'/><use href='#s' x='6' y='9'/></g></pattern><pattern id='h' width='5' height='13' patternUnits='userSpaceOnUse' patternTransform='scale(23.75) translate(-957.89 -718.42)'><g  fill='#f5f5f5'><use href='#s' y='5'/><use href='#s' y='8'/><use href='#s' x='1' y='1'/><use href='#s' x='1' y='9'/><use href='#s' x='1' y='12'/><use href='#s' x='2'/><use href='#s' x='2' y='4'/><use href='#s' x='3' y='2'/><use href='#s' x='3' y='6'/><use href='#s' x='3' y='11'/><use href='#s' x='4' y='3'/><use href='#s' x='4' y='7'/><use href='#s' x='4' y='10'/></g></pattern><pattern id='c' width='17' height='13' patternUnits='userSpaceOnUse' patternTransform='scale(23.75) translate(-957.89 -718.42)'><g  fill='#f2f2f2'><use href='#s' y='11'/><use href='#s' x='2' y='9'/><use href='#s' x='5' y='12'/><use href='#s' x='9' y='4'/><use href='#s' x='12' y='1'/><use href='#s' x='16' y='6'/></g></pattern><pattern id='d' width='19' height='17' patternUnits='userSpaceOnUse' patternTransform='scale(23.75) translate(-957.89 -718.42)'><g  fill='#ffffff'><use href='#s' y='9'/><use href='#s' x='16' y='5'/><use href='#s' x='14' y='2'/><use href='#s' x='11' y='11'/><use href='#s' x='6' y='14'/></g><g  fill='#efefef'><use href='#s' x='3' y='13'/><use href='#s' x='9' y='7'/><use href='#s' x='13' y='10'/><use href='#s' x='15' y='4'/><use href='#s' x='18' y='1'/></g></pattern><pattern id='e' width='47' height='53' patternUnits='userSpaceOnUse' patternTransform='scale(23.75) translate(-957.89 -718.42)'><g  fill='#3BA2EE'><use href='#s' x='2' y='5'/><use href='#s' x='16' y='38'/><use href='#s' x='46' y='42'/><use href='#s' x='29' y='20'/></g></pattern><pattern id='f' width='59' height='71' patternUnits='userSpaceOnUse' patternTransform='scale(23.75) translate(-957.89 -718.42)'><g  fill='#3BA2EE'><use href='#s' x='33' y='13'/><use href='#s' x='27' y='54'/><use href='#s' x='55' y='55'/></g></pattern><pattern id='g' width='139' height='97' patternUnits='userSpaceOnUse' patternTransform='scale(23.75) translate(-957.89 -718.42)'><g  fill='#3BA2EE'><use href='#s' x='11' y='8'/><use href='#s' x='51' y='13'/><use href='#s' x='17' y='73'/><use href='#s' x='99' y='57'/></g></pattern></defs><rect fill='url(#a)' width='100%' height='100%'/><rect fill='url(#b)' width='100%' height='100%'/><rect fill='url(#h)' width='100%' height='100%'/><rect fill='url(#c)' width='100%' height='100%'/><rect fill='url(#d)' width='100%' height='100%'/><rect fill='url(#e)' width='100%' height='100%'/><rect fill='url(#f)' width='100%' height='100%'/><rect fill='url(#g)' width='100%' height='100%'/></svg>`);
export const bgImage = `url("data:image/svg+xml,${svgBackground}")`;
const customLogo = "data:image/svg+xml;base64,PHN2ZyBpZD0iZWNjZmJjZWQtMTBjYS00ODdhLWE0MjUtYmYzNGY5ZTE1MTM5IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij48ZGVmcz48cmFkaWFsR3JhZGllbnQgaWQ9ImI5MTU3MzBjLWRjNjktNGNkNC04Y2YzLTYxOTg4MmI4ZThhYiIgY3g9IjU1LjcxIiBjeT0iNzEuOTIiIHI9IjkiIGdyYWRpZW50VHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTQzLjYxIC01OC45Mikgc2NhbGUoMC45NCAwLjk0KSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iMC42NyIgc3RvcC1jb2xvcj0iIzZiYjlmMiIgLz48c3RvcCBvZmZzZXQ9IjAuNzQiIHN0b3AtY29sb3I9IiM2MWI0ZjEiIC8+PHN0b3Agb2Zmc2V0PSIwLjg1IiBzdG9wLWNvbG9yPSIjNDdhOGVmIiAvPjxzdG9wIG9mZnNldD0iMC45OSIgc3RvcC1jb2xvcj0iIzFkOTRlYiIgLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMxYjkzZWIiIC8+PC9yYWRpYWxHcmFkaWVudD48L2RlZnM+PHRpdGxlPkljb24tbWFjaGluZWxlYXJuaW5nLTE2NTwvdGl0bGU+PHBhdGggaWQ9ImY2YTI5ZTFiLTE5NGItNGQ4ZC04NTI5LTQ5ZWRlYTdiYmJhMCIgZD0iTTksLjVBOC41LDguNSwwLDEsMCwxNy41LDksOC41LDguNSwwLDAsMCw5LC41WiIgZmlsbD0idXJsKCNiOTE1NzMwYy1kYzY5LTRjZDQtOGNmMy02MTk4ODJiOGU4YWIpIiAvPjxjaXJjbGUgY3g9IjkiIGN5PSI5IiByPSI3LjAzIiBmaWxsPSIjZmZmIiAvPjxjaXJjbGUgY3g9IjcuNDUiIGN5PSI5IiByPSIwLjc3IiBmaWxsPSIjMzJiZWRkIiAvPjxwYXRoIGQ9Ik01LjI2LDYuOEg0Ljg4YS4yOS4yOSwwLDAsMC0uMjkuMjl2NS43MmEuNTkuNTksMCwwLDAsLjU5LjU5aDUuNTdhLjI5LjI5LDAsMCwwLC4yOS0uM3YtLjM4YS4yOS4yOSwwLDAsMC0uMjktLjI5aC01YS4xNC4xNCwwLDAsMS0uMTQtLjE1VjcuMDlBLjI5LjI5LDAsMCwwLDUuMjYsNi44WiIgZmlsbD0iIzMyYmVkZCIgLz48Y2lyY2xlIGN4PSIxMC41NSIgY3k9IjkiIHI9IjAuNzciIGZpbGw9IiMzMmJlZGQiIC8+PHBhdGggZD0iTTEyLjQyLDQuNkg3LjIzYS4yOS4yOSwwLDAsMC0uMjkuM3YuMzhhLjI5LjI5LDAsMCwwLC4yOS4yOWg1YS4xNS4xNSwwLDAsMSwuMTUuMTV2NS4xOWEuMjkuMjksMCwwLDAsLjI5LjI5aC4zOGEuMjkuMjksMCwwLDAsLjI5LS4yOVY1LjE5YS41OS41OSwwLDAsMC0uNTgtLjU5WiIgZmlsbD0iIzMyYmVkZCIgLz48L3N2Zz4="

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
    font-weight: 400;
    color: #3BA2EE;
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