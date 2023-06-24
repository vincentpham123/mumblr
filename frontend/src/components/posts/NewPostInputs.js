//this component will be called in each new text post depending on how many enters they pressed
// depending on what opion is selected, it will rerender into a new form
// default will be text
// state variable will change depending on what is selected
// each button, onClick will change that state variable to 'photo' or 'video'
// this component will have those ready to render depending on the statevaraible
// a menu will be displayed if it is focused on


const NewPostInput = ({handleKeyDown,handlePhotoUpload,index}) => {
    

    return (
        <p  key={index} data-type={index} onKeyDown={(event)=>handleKeyDown(event)} id={`paragraph-${index}`}  className='contentEdit text-paragraph' contentEditable='true'></p>
    )
}

export default NewPostInput;