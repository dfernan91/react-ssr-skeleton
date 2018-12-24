import React, {Component} from 'react';
import axios from "axios";
import {isBrowser} from "../../tools/constant";
import {setStore} from "trim-redux";
import connect from "react-redux/es/connect/connect";

class Home extends Component {
    constructor(props, context) {
        super(props, context);
    }


    render() {
        const {home} = this.props;
        console.log(home);
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-18 offset-3">
                        <div className="row mt-10">
                            {
                                home.map((item, index) =>
                                    <a href={item.show.url} key={index} className="col-4 mb-5">
                                        <div className="item">
                                            <img src={item.show.image.medium} alt={item.title}/>
                                            <span>{item.show.name}</span>
                                        </div>
                                    </a>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Home.fetchData = () => {
    return new Promise(function (resolve) {
        axios({
            url: 'https://api.tvmaze.com/search/shows?q=batman',
            timeout: 10000
        })
            .then((response) => {
                if (isBrowser)
                    setStore({
                        home: response.data
                    });
                else
                    global.storeState.home = response.data;

                resolve();
            })

            .catch((error) => {

                resolve();
            })
    })
};


const mstp = state => ({
    home: state.home,
});


export default connect(mstp)(Home);
