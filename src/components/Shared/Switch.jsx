import React from "react";
import styled from "styled-components";
import { WiDaySunny, WiNightAltCloudy } from "react-icons/wi";

const Switch = ({ checked, onChange }) => {
  return (
    <StyledSwitch>
      <input
        id="theme-toggle"
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <label htmlFor="theme-toggle">
        <WiDaySunny className="sun" />
        <WiNightAltCloudy className="moon" />
        <div className="track"></div>
        <div className="knob"></div>
      </label>
    </StyledSwitch>
  );
};

const StyledSwitch = styled.div`
  input {
    display: none;
  }

  label {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 70px;
    height: 36px;
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    cursor: pointer;
    padding: 0 12px;
    box-shadow: 
      0 8px 32px rgba(0,0,0,0.1),
      inset 0 1px 0 rgba(255,255,255,0.2);
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  }

  input:checked + label {
    background: rgba(74, 108, 247, 0.3);
    border-color: rgba(74, 108, 247, 0.5);
    box-shadow: 
      0 8px 32px rgba(74, 108, 247, 0.2),
      inset 0 1px 0 rgba(255,255,255,0.3);
  }

  .sun, .moon {
    font-size: 20px;
    transition: all 0.3s ease;
    z-index: 2;
  }

  .sun {
    color: #fbbf24;
    opacity: checked ? 1 : 0.4;
  }

  .moon {
    color: #cbd5e1;
    opacity: checked ? 0.4 : 1;
  }

  input:checked + label .sun {
    opacity: 1;
  }

  input:checked + label .moon {
    opacity: 0.4;
  }

  .track {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 46px;
    height: 4px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 2px;
    transform: translate(-50%, -50%);
    opacity: 0.7;
    transition: all 0.3s ease;
  }

  input:checked + label .track {
    background: rgba(74, 108, 247, 0.8);
    opacity: 1;
  }

  .knob {
    position: absolute;
    right: 8px;
    width: 20px;
    height: 20px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 50%;
    backdrop-filter: blur(20px);
    border: 2px solid rgba(255, 255, 255, 0.5);
    box-shadow: 
      0 4px 16px rgba(0,0,0,0.15),
      inset 0 1px 0 rgba(255,255,255,0.8);
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  }

  input:checked + label .knob {
    right: 42px;
    background: rgba(74, 108, 247, 0.9);
    box-shadow: 
      0 4px 16px rgba(74, 108, 247, 0.3),
      inset 0 1px 0 rgba(255,255,255,0.9);
  }

  label:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 12px 40px rgba(0,0,0,0.15),
      inset 0 1px 0 rgba(255,255,255,0.3);
  }
`;

export default Switch;
