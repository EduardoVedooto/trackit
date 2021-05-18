import styled from 'styled-components';

const InputWrapper = styled.form`
    width: 90%;

    input {
        width: 100%;
        margin: 2.5px 0;
        border-radius: 5px;
        border: 1px solid #d5d5d5;
        background-color: #FFF;
        color: #666666;
        height: 45px;
        outline: none;
        padding-left: 10px;
        font-size: 20px;
        ::placeholder{
            color: #DBDBDB;
        }
    }
    button{
        width: 100%;
        margin-top: 2.5px;
        border-radius: 5px;
        height: 45px;
        border: none;
        cursor: pointer;
        background-color: #52B6FF;
        color: #FFF;
        font-size: 20px;
    }
`;

export default InputWrapper;