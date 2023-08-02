![image](https://github.com/vincentpham123/mumblr/assets/127375334/86ff3613-dba5-4e1a-8c4f-9b83a48d7c27)

[Give it a look!](https://mumblr-3mio.onrender.com)

Mumblr, a tumblr clone, is a website that allows users to express themselves free of judgement through post creations. Users are able to follow other users as well as like blog posts they come across during their time on the sire. 


##Libraries and APIs
* Ruby on Rails
* React.js
* Redux Toolkit
* CSS3, HTML5
* PostGreSQL
* Amazon S3
* IntersectionObserver


##Features 
* Feed: Users are able to view a variety of posts depending on the feed selected. Users are able to like and unlike. Users are also able to create, edit, and delete their own comments.

![ezgif com-video-to-gif (2)](https://github.com/vincentpham123/mumblr/assets/127375334/13469315-2e03-4575-be90-bb678d192501)


.Blog Post Creation: Users can create posts that can display images or text. Users are also able to edit their past blog posts

![ezgif com-video-to-gif (3)](https://github.com/vincentpham123/mumblr/assets/127375334/51a09ff4-9d3d-4011-9948-8a51aa93b948)



.Profile Page: Each user has a profile page that displays their posts, liked posts, follows, and followers


<img width="1508" alt="image" src="https://github.com/vincentpham123/mumblr/assets/127375334/82049266-d6f2-464e-aed3-f62040d4938f">


## Highlighted Features
 1. **Infinite Scrolling** In order to implement infinite scrolling, the site uses the Javascript API Intersection Observer in order to keep track of the last post currently on the page. The intersection observer is then called within a callback function that is then attached to the last post element as a reference. Once that post is visible, a page number state variable is increased by one which then triggers a useEffect to fetch 5 more posts
    <img width="661" alt="Screenshot 2023-07-26 at 3 30 05 PM" src="https://github.com/vincentpham123/mumblr/assets/127375334/43b3d555-e24c-4bf9-b5e2-0c4241f7114f">

    <img width="690" alt="Screenshot 2023-07-26 at 3 31 09 PM" src="https://github.com/vincentpham123/mumblr/assets/127375334/36ac9e91-696f-43d7-9020-e39432dc4d0b">


2. **Post state management** To maintain a dynamic blog post creation and update form, the application manages a blog post state and dynamically updates depending on the user's actions. User's are able to remove images, insert as many bodies of text as they need, insert images between bodies of text all due to the applications management of a post form's state. 

<img width="1137" alt="Screenshot 2023-07-26 at 3 37 21 PM" src="https://github.com/vincentpham123/mumblr/assets/127375334/f49459ef-406c-47d6-9cd1-355d87ce5445">

<img width="958" alt="Screenshot 2023-07-26 at 3 37 37 PM" src="https://github.com/vincentpham123/mumblr/assets/127375334/b8ee2250-e710-47dc-bcc9-220ea31096f7">


## Features to add in the future

* search bar
* tags for posts
  

