import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getNonogramPuzzles, getNonogramPixels } from "../utilities";
import NonoPuzzleCard from "../components/NonoPuzzleCard";

export default function NonoPage() {
  const [noData, setNoData] = useState(null);
  const [imageMap, setImageMap] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
      const fetchPuzzles = async () => {
        const data = await getNonogramPuzzles();
        setNoData(data);
      };
    
      fetchPuzzles();
    }, []);

    useEffect(() => {
      const fetchPixels = async () => {
        const data = await getNonogramPixels();
        const map = {};
        data.forEach(item => {
          map[item.id] = item.source_url;
        });
        setImageMap(map);
      };
    
      fetchPixels();
    }, []);



  return (
    <>
    <div className="main-page-contents px-3 py-3">
    <h2 className="mt-1 mb-4">Nonogram Puzzles</h2>
      {noData && imageMap ? (
        <div className="row">
          {noData.map((item, index) => (
            <NonoPuzzleCard key={index} id={item.id} imgUrl={imageMap[item.id]} />
          ))}
        </div>
      ) : (
        <p>fetching data</p>
      )}
    </div>
  </>
  );
};