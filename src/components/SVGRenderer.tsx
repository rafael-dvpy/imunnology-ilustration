import { useEffect, useRef, useState } from "react";
import { ReactSVG } from "react-svg";
import yourSvgFile from "./react.svg";

const SVGRenderer = () => {
  const svgRef = useRef<HTMLDivElement | null>(null);
  const [svgSize, setSvgSize] = useState({ width: 300, height: 300 });

  useEffect(() => {
    if (!svgRef.current) return;

    const xhr = new XMLHttpRequest();
    xhr.open("GET", yourSvgFile, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const svgData = xhr.responseText;
        const parser = new DOMParser();
        const svgElement = parser.parseFromString(
          svgData,
          "image/svg+xml"
        ).documentElement;
        svgRef.current.innerHTML = "";
        svgRef.current.appendChild(svgElement);
      }
    };
    xhr.send();
  }, []);

  const handleResize = (newWidth: number, newHeight: number) => {
    setSvgSize({ width: newWidth, height: newHeight });
  };

  const handleDragStart = (event: React.DragEvent<SVGElement>) => {
    const { clientX, clientY } = event;
    event.dataTransfer?.setData("text/plain", `${clientX},${clientY}`);
  };

  const handleDragOver = (event: React.DragEvent<SVGElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<SVGElement>) => {
    event.preventDefault();
    const { dataTransfer } = event;
    if (dataTransfer) {
      const [startX, startY] = dataTransfer.getData("text/plain").split(",");
      const offsetX = event.clientX - parseFloat(startX);
      const offsetY = event.clientY - parseFloat(startY);
      const svgElement = svgRef.current?.querySelector("svg");
      if (svgElement) {
        svgElement.setAttribute(
          "x",
          `${parseFloat(svgElement.getAttribute("x") || "0") + offsetX}`
        );
        svgElement.setAttribute(
          "y",
          `${parseFloat(svgElement.getAttribute("y") || "0") + offsetY}`
        );
      }
    }
  };

  return (
    <div>
      <div ref={svgRef} />

      <div>
        <ReactSVG
          src={yourSvgFile}
          beforeInjection={(svg) => {
            const svgElement = svg.querySelector("svg");
            if (svgElement) {
              svgElement.setAttribute("width", `${svgSize.width}px`);
              svgElement.setAttribute("height", `${svgSize.height}px`);
            }
          }}
          draggable="true"
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        />
      </div>

      <div>
        <button
          onClick={() => handleResize(svgSize.width * 2, svgSize.height * 2)}
        >
          Double Size
        </button>
      </div>
    </div>
  );
};

export default SVGRenderer;
