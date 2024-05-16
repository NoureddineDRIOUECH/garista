import React from 'react';
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaTiktok } from "react-icons/fa6";
import "./CardProfile.css";

const CardProfile = ({ data }) => {
    return (
        <div className=" mt-4 mb-4 flex justify-center bg-white">
            <div className="card p-4">
                <div className="image flex flex-col justify-center items-center">
                    <button className="btn btn-secondary border overflow-hidden bg-neutral-300 flex justify-center items-center">
                        <img src="https://i.imgur.com/wvxPV9S.png" height="100" width="100" alt="Profile" />
                    </button>
                    <span className="name mt-3">{data.first_name + ' ' + data.last_name}</span>
                    <span className="idd">Admin</span>

                    <div className="flex flex-row mt-3">
                        <span className="number">Email <span className="follow">Admin@gmail.com</span></span>
                    </div>
                    <div className="flex flex-row mt-3">
                        <span className="number">Tele <span className="follow">0675162919</span></span>
                    </div>

                    <div className="text mt-3">
                        <span>Eleanor Pena is a creator of minimalistic x bold graphics and digital artwork.Artist/ Creative Director by Day #NFT minting@ with FND night.Eleanor Pena is a creator of minimalistic x bold graphics and digital artwork.</span>
                    </div>
                    <div className="gap-3 mt-3 icons flex justify-center items-center">
                        <FaTiktok size={18} />
                        <FaFacebook />
                        <RiInstagramFill />
                    </div>

                    <div className="px-2 rounded mt-4 date">
                        <span className="join">Joined May, 2021</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardProfile;
