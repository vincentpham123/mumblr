import './posttext.css';
const PostText = ({post}) => {
    // need to check if post has a title
    // if post has a title, then that will be the first child of post-paragraph and have bigger font
    const styles = {
        fontSize: '1.625rem',
        lineHeight: 1.3077,
        paddingLeft: '20px',
        paddingRight: '20px',
        minHeight: '1.5em',
        marginBottom: '15px',
      };
    const breakdown = (body, title) => {
        const array = body.split('\n');
        return array.map((sentence,index)=>{
            return(
            <div key={index} className='post-paragraph'>
                <p className='textStrings'>{sentence}</p>
                <p></p>
            </div>
            )
        })
    }

    return (
        <>
            <div className='posttext-body'>
                <p className='post-paragraph'>
                    {post && <h1 style={{fontSize: '1.625rem',lineHeight: 1.3077 }}>{post.title}</h1>}
                </p>
                {breakdown(post.body)}
            </div>
        </>
    )

}

export default PostText;