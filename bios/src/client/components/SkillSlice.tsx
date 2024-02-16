import React from "react";
import styled from "styled-components";

interface SkillSliceProps {
    target: number;
    real: number;
}

const SliceWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #000;
  position: relative;
  overflow: hidden;
`;

const Filling = styled.div<{ target: number; real: number }>`
  width: 100%;
  height: 100%;
  background: conic-gradient(
    rgba(89, 160, 232) 0% ${(props) => (props.real / props.target) * 100}%,
    transparent ${(props) => (props.real / props.target) * 100}% 100%
  );
  position: absolute;
  transform-origin: top center;
`;

const Slice = styled.div`
  width: 100%;
  height: 0.5px;
  background: black;
  position: absolute;
  top: 50%;
  left: 0;
  transform-origin: top center;
`;

const SkillSlice: React.FC<SkillSliceProps> = ({ target, real }) => {
    const sliceCount = target;

    return (
        <SliceWrapper>
            <Filling target={target} real={real} />

            {Array.from({ length: sliceCount }).map((_, i) => (
                <Slice
                    key={i}
                    style={{
                        transform: `rotate(${(360 / sliceCount) * i - 270
                            }deg) translate(-50%, -50%)`,
                    }}
                />
            ))}
        </SliceWrapper>
    );
};

export default SkillSlice;
