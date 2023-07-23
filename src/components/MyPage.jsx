import styled from 'styled-components'

const Wrapper = styled.section`
margin-top: 80px;
`


function MyPage(){
    return <Wrapper>
        <h2>내가 쓴 글</h2>
        <table border={1}>
            <thead>
                <tr>
                    <th colSpan={2}>글 목록</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>번호</td>
                    <td>제목</td>
                </tr>
            </tbody>

        </table>
    </Wrapper>
}

export default MyPage;

