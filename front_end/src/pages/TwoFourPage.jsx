// 2048 game logic:
// You can move tiles (up/down/left/right) on a 4x4 grid
// Same-valued tiles merge and double when they collide.
// New tile (2 or 4) appears randomly after every move.
// Game ends when no moves are left
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import TwoFourGame from "../components/TwoFourGame";

export default function TwoFourPage() {
    return 
    (
    <>
        <h1>2048 Game</h1>
        <TwoFourGame />
    </>
    );
};