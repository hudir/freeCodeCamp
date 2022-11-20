function lunchMatch(input) {
    // convert input to array, should be [{ name: nikki, start: 200, end: 250}, ...]
    const line = input.split('\n')
    const array = line.map(el => {
        const people = el.split(' ')
        return {
            name: people[0],
            start: +people[1],
            end: +people[2]
        }
    })

    // times match mean p1's end time - nikki's start time >= 60
    // if more than one, match the one with max time
    // if they have same max time , take the one's p1 start time - nikki's start time > 0

    const nikki = array.filter(x => x.name=='nikki')[0]

    const step1 = array.filter(x => (x.end - nikki.start) >= 60)

    // times match mean p1's end time - nikki's start time >= 60
    if(step1.length < 1) return 'NO MATCH'
    if(step1.length == 1) return step1[0].name
    

    // find the max time
    const step2 = step1.map(x=> {
        x.overlap = x.end - nikki.start
        return x
    }).sort((a,b)=> b.overlap - a.overlap)

    // if more than one, match the one with max time
    if(step2[0].overlap > step2[1].overlap) return step1[0].name

    // if they have same max time , take the one's  first meet nikke 
    const step3 = step2.filter(x=> x.overlap == step2[0].overlap)

    if(step3.some(x=> x.start <= nikki.start)) return step3.filter(x=> x.start <= nikki.start)[0].name

    step3 = step3.map(x=>{
        x.early = x.start - nikki.start
        return x
    }).sort((a,b)=> a.early - b.early)

    return step3[0].name
}



// const userSchema = {
//     first_name: String,
//     ...
// }

// const User = mongoose.model('User', userSchema)

// User.creat({aUser}).then(user=>
//     // here we have user._id
//     ).catch()

// User.deleteOne({_id})
// User.updateOne({_id}, {$set: {email: "newEmail"}})
// User.findOne({_id}, (err, user)=>{
//     if (user) {
//         // we find a user
//     }
// })

// user.find({Location: "San Francisco"}, (err, data)=>{
//     data.sort(el=>el.last_name)
// })

// User.updateOne({_id}, {$set: {phone: "newPhone"}})

// User.find({last_time_online >=  Date("the first day of last week")}, (err, data)=>{
//     //get all online
// })

