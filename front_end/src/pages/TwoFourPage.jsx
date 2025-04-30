// 2048 game logic:
// You can move tiles (up/down/left/right) on a 4x4 grid
// Same-valued tiles merge and double when they collide.
// New tile (2 or 4) appears randomly after every move.
// Game ends when no moves are left
import TwoFourGame from "../components/TwoFourGame";

export default function TwoFourPage() {
    return (
    <>
        {/* <h2 className="mt-1 mb-4" style={{ textAlign: 'center' }}>2048 Game</h2> */}
        <TwoFourGame />

    </>
    );
};