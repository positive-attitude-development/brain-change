import React, { Component } from 'react'
import { Link} from 'react-router-dom'; 

export class BeliefInstructions1 extends Component {
    render() {
        return (
            <div>
                <div className ="instructions">
                On the next screen please write 3 of your beliefs that you would not want to give up.
                 Beliefs can be personal, political, or religious. Here is a short tutorial.
                 </div>
                 
                 <div className="examples">
                  (Examples for tutorial: I believe people can change for the better. 
                I believe taxes should be lowered. I believe in a higher power.)
                </div>

                <Link to="/Belief1"> link </Link>
            </div>
        )
    }
}

export default BeliefInstructions1
