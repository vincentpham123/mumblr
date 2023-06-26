import './styling/posttext.css';
import { useState } from 'react';
const PostText = ({post}) => {
    // need to check if post has a title
    // if post has a title, then that will be the first child of post-paragraph and have bigger font
    // const [photoCount,setPhotoCount]=useState(1);
    const styles = {
        fontSize: '1.625rem',
        lineHeight: 1.3077,
        paddingLeft: '20px',
        paddingRight: '20px',
        minHeight: '1.5em',
        marginBottom: '15px',
      };
    console.log(post);
    // const handlePhotoCount = () => {
    //    if(photoCount<5)setPhotoCount((prevCount)=> prevCount+1);
    // }
    const breakdown = (post) => {
        const array = post.body.split('\r\n');
        console.log(array);
        const url1=post.photo1;
        const url2=post.photo2;
        const url3=post.photo3;
        const url4=post.photo4;
        let photoCount=1;
        return array.map((sentence,index)=>{
            if(sentence==='_@#$photo__@#$'){
                switch (photoCount) {
                    case (1):
                        photoCount+=1;
                        return(
                            <div className='image-container'>
                                <figure className='image-figure'>
                                    <div className='image-box'>
                                        <img id='1' src={url1} alt='' className='post-image' ></img>
                                    </div>
                                </figure>
                            </div>
                        );
                    case 2:
                        photoCount+=1;
                        return(
                            <>
                            <div className='image-container'>
                                <figure className='image-figure'>
                                    <div className='image-box'>
                                        <img id='2' src={post.photo2} alt='' className='post-image' />
                                    </div>
                                </figure>
                            </div>
                            </>
                        );
                    case 3:
                        // handlePhotoCount();
                        photoCount+=1;

                        return(
                            <div className='image-container'>
                                <figure className='image-figure'>
                                    <div className='image-box'>
                                        <img id='3'src={post.photo3} alt='' className='post-image' />
                                    </div>
                                </figure>
                            </div>
                        );
                    case 4:
                        photoCount+=1;

                        // handlePhotoCount();
                        return(
                            <div className='image-container'>
                                <figure className='image-figure'>
                                    <div className='image-box'>
                                        <img id='4' src={post.photo4} alt='' className='post-image' />
                                    </div>
                                </figure>
                            </div>
                        );
                    default:
                        break;
                }
            } else {
                return(
                <div key={index} className='post-paragraph'>
                    <p className='textStrings'>{sentence}</p>
                    <p></p>
                </div>
                )
            }
        })
    }

    return (
        <>
            <div className='posttext-body'>
            {/* <img src={post.photo1} alt='' className='post-image' /> */}
                {post.title!=='' &&
                <p className='post-paragraph'>
                    <h1 style={{fontSize: '1.625rem',lineHeight: 1.3077 }}>{post.title}</h1>
                </p>
                }
                {breakdown(post)}
            </div>
        </>
    )

}

export default PostText;