import styled from 'styled-components';

const Form = styled.form`
    width: 90%;

    input {
        width: 100%;
        margin: 2.5px 0;
        border-radius: 5px;
        border: 1px solid #d5d5d5;
        background-color: #FFF;
        color: ${props => props.waitingServer ? "#bbbbbb" : "#666666"};
        height: 45px;
        outline: none;
        padding-left: 10px;
        font-size: 20px;
        ::placeholder{
            color: #DBDBDB;
        }
        :focus{
            box-shadow: 0 0 10px 1px rgba(82,182,255,.3);
        }
    }
`;

export default Form;