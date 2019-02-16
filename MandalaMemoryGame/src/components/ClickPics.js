import React from "react";
// import Shuffle from "./ClickCounter";






class ClickableImages extends React.Component {
    // set the initial state of ClickableImages component

    constructor() {

        // establish state in this component with super()
        super();

        // Creating an array of images
        this.state = {
            allMandalas:
                [
                    {
                        name: 'one',
                        source: "https://i.imgur.com/uAQrEF1.png",
                        clicks: 0,
                        isSelected: false
                    },
                    {
                        name: 'two',
                        source: "https://i.imgur.com/JtPSwQ7.png",
                        clicks: 0,
                        isSelected: false
                    },
                    {
                        name: 'three',
                        source: 'https://i.imgur.com/Snh632h.png',
                        clicks: 0
                    },
                    {
                        name: 'four',
                        source: 'https://i.imgur.com/W5sF6Fu.png',
                        clicks: 0
                    },
                    {
                        name: 'five',
                        source: "https://i.imgur.com/HWvJrfa.png",
                        clicks: 0
                    },
                    {
                        name: 'six',
                        source: "https://i.imgur.com/atV07bT.png",
                        clicks: 0
                    },
                    {
                        name: 'seven',
                        source: "https://i.imgur.com/iDfqYGC.png",
                        clicks: 0
                    },
                    {
                        name: 'eight',
                        source: "https://i.imgur.com/rkENgFU.png",
                        clicks: 0
                    },
                    {
                        name: 'nine',
                        source: "https://i.imgur.com/ebNrhn3.png",
                        clicks: 0
                    },
                    {
                        name: 'ten',
                        source: "https://i.imgur.com/VfIEovJ.png",
                        clicks: 0
                    }
                ]
        }
    }







    //this is the class outside the function



//Function for when user clicks on an image
    HandleClicks = () => {

        // If they have already clicked this image, reset clicks to zero and restart game
        if (this.state.clicks >= 1) {
            alert('Game Over!');
            let clicks = 0;
            this.setState({ clicks });
        }

        // If they haven't clicked it yet, update clicks and shuffle images
        else {
            let clicks = 1;
            this.setState({ clicks });
            console.log(this.state.allMandalas);
            // Need to use 'Shuffle' function from ClickCounter.js but don't know how
            // Function works in console but can't get it to work with React
        }

    }

    // HandleClicks(selectedName) {
    //     // const { allMandalas } = this.state.allMandalas;
     
    //     this.state.allMandalas.setState({
    //       // Here we make sure we don't mutate the state
    //       allMandalas: this.state.allMandalas.map(s => ({
    //          ...s,
    //          // Toggle the clicked one, and reset all others to be `false`.
    //         //  isSelected: s.index === selectedName
    //          // If you want to keep the values of the rest ss, then the check should be: 
    //          isSelected: (s.name === selectedName) ? !s.isSelected : s.isSelected
    //       }))
    //     })
    //  }







    // The render method returns the JSX that should be rendered
    render() {
        return (
            <div className="card text-center">

                {/* Header */}
                <center>
                    <div className='mainTitle'>Mesmerizing Mandalas</div>
                    <div className='smallTitle'>A Memory Game</div>
                </center>

                {/* Generating all images using map */}
                <center>

                    {this.state.allMandalas.map((s, index) =>
                        <div className='wholeImg'>
                            {/* key={index} */}
                            <div>
                                {/* {s.index} <br /> */}
                                {/* {s.name}<br /> */}
                                <button className='imgBtn' 
                                onClick={this.HandleClicks}>
                                <img
                                    src={s.source}
                                    // onClick={this.HandleClicks}
                                    alt='mandala'
                                    className='images' >
                                </img></button>
                                {/* {s.clicks} */}
                                {/* <s onClick={() => this.HandleClicks(s.name) }/> */}
                            </div>
                        </div>)}

                </center>


                <br/><br/><br/><br/>

                        {/* Instructions for game */}
                <center>
                    <div className='instructions'>To play, try to click each mandala once. <br />
                        The images will shuffle after each click.<br />
                        Make sure you don't click on the same mandala twice. </div>
                </center>
            </div>
        );
    }
}

// ClickableImages.allMandalas = {
//     allMandalas: React.allMandalas.array,
//     };

export default ClickableImages;

