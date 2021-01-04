import styled from 'styled-components'

const Button = styled.button`
	background-color: cornflowerblue;
	border-radius: 4px;
	color: white;
`

const TextField = styled.input`
	background-color: skyblue;
	border-radius: 4px;
	padding: 0 5px;
	color: white;
`
const ListItem = styled.div`
	background-color: ${(props) =>
		(props.even && 'lavender') || 'white'
	};
	border-radius: 4px;
`
export {
	Button,
	TextField,
	ListItem
}