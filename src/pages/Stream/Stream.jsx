import React from 'react'
import "./Stream.css"
import { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const Stream = () => {
    // 4ce887fe-84fd-4d00-8588-6d6325f01a53
    // 927cef7c-e42b-46dc-9f07-29cf8827133d
    const [peerId, setpeerId] = useState("loading...");
    const remotePerrIdValue = "4ce887fe-84fd-4d00-8588-6d6325f01a53"
    const currentPeerId = "927cef7c-e42b-46dc-9f07-29cf8827133d"
    const remoteVideoRef = useRef();
    const currentUserVideoRef = useRef();
    const peerInstance = useRef();
    const arr = [];

    useEffect(() => {
        const peer = new Peer();

        peer.on("open", (id) => {
            setpeerId(id);
        });

        peer.on('call', (call) => {
            var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

            getUserMedia({ video: true, audio: true }, (mediaStream) => {
                currentUserVideoRef.current.srcObject = mediaStream;
                currentUserVideoRef.current.play();

                call.answer(mediaStream);
                call.on('stream', (remoteStream) => {
                    remoteVideoRef.current.srcObject = remoteStream;
                    remoteVideoRef.current.play();
                })
            });
        })

        peerInstance.current = peer;
    }, []);

    const call = (remotePerrId) => {
        var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        getUserMedia({ video: true, audio: true }, (mediaStream) => {

            currentUserVideoRef.current.srcObject = mediaStream;
            currentUserVideoRef.current.play();

            const call = peerInstance.current.call(remotePerrId, mediaStream);

            call.on("stream", (remoteStream) => {
                remoteVideoRef.current.srcObject = remoteStream;
                remoteVideoRef.current.play();
            });
        });
    };

    const findDomain = async () => {
        const host = window.location.host; // gets the full domain of the app
        const array = (host
            .split(".")
            .slice(0, host.includes("localhost") ? -1 : -2));
        arr.push(array)
    }

    findDomain();

    return (
        <>
            {arr[0] == "admin" ?
                <div className="App">
                    <header className="App-header">
                        <button onClick={() => call(remotePerrIdValue)}>Start Stream</button>
                        <div className="video_container">
                            <video ref={currentUserVideoRef} />
                            <video ref={remoteVideoRef} />
                        </div>
                    </header>
                </div>
                :
                <>
                    <div className="App">
                        <header className="App-header">
                            <div className="video_container">
                                <h1>egreger</h1>
                                <video ref={currentUserVideoRef} />
                                <video ref={remoteVideoRef} />
                            </div>


                           
                        </header>
                    </div>
                </>
            }
        </>
    )
}

export default Stream