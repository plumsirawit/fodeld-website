import React, { useState, useEffect } from 'react';
import { useTypewriter } from '../helper/util';
import THREE from 'three';

const Header = () => {
    const mainLabel = useTypewriter('Fodeld', 100);
    const subLabel = useTypewriter('An innovative solution to reduce hunger during self-lockdown', 70, mainLabel === 'Fodeld');
    return <section style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
    }}>
        <h1 style={{
            fontFamily: "Roboto Slab, serif",
            fontSize: "2em"
        }}>
            {"\u200B" + mainLabel}
        </h1>
        <h4 style={{
            marginTop: "0px",
            fontFamily: "Roboto Slab, serif",
            fontWeight: 400
        }}>
            {"\u200B" + subLabel}
        </h4>
        <div style={{
            borderBottomStyle: "solid",
            height: "0px",
            width: "100vw"
        }}>
        </div>
    </section>
}
const MainCanvas = () => {
    return <canvas>

    </canvas>;
}

const Index = () => {
    return <React.Fragment>
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet"></link>
        <Header />
        <MainCanvas />
    </React.Fragment>
}

export default Index;