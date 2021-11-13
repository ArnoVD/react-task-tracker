import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title, onAdd, showAdd}) => {
    const onClick = () => {
        console.log('Click')
    }

    return (
        <header className='header'>
            <h1>{title}</h1>
            {/*If showAdd is true than set text to close, otherwise set it to add (same for color)*/}
            <Button
                color={showAdd ? 'red' : 'green'}
                text={showAdd ? 'Close' : 'Add'} onClick={onAdd}
            />
        </header>
    )
}

Header.defaultProps = {
    title: 'Task Tacker',
}

// Set the requirements for the header title
Header.propTypes = {
    title: PropTypes.string.isRequired,
}

// CSS in JS
// const headingStyle = {
//     color: 'red',
//     backgroundColor: 'black'
// }

export default Header