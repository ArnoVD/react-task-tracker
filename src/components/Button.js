import PropTypes from 'prop-types'

const Button = ({ color, text, onClick }) => {
    return <button onClick={onClick}
        style={{backgroundColor: color}} 
        className='btn'>{text}
    </button>
}

Button.defaultProps = {
    color: 'steelblue'
}

// Set the requirements for the text and color
Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func
}

export default Button