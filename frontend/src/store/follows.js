const RECEIVE_FOLLOWS ='/api/RECEIVEFOLLOWS'
const DELETE_FOLLOW = '/api/DELETEFOLLOW'      
const RECEIVE_FOLLOW = '/api/RECEIVEFOLLOW'

//actions

const receiveFollows = (follows) =>({
type: RECEIVE_FOLLOWS,
follows
})

const deleteFollow = (followid) => ({
    type: DELETE_FOLLOW,
    followid
});

const receiveFollow = (follow) =>({
    type: RECEIVE_FOLLOW,
    follow
})
