import { useUser } from '../context/UserContext';

function ColorPicker() {
  const { color, setColor, socket } = useUser();

  const handleChange = (channel, value) => {
    const newColor = { ...color, [channel]: value };
    setColor(newColor);
    socket?.emit('color-change', newColor);
  };

  return (
    <div className="color-picker">
      <h3>Color Picker (CMYK)</h3>
      <div className="sliders">
        {Object.entries(color).map(([channel, value]) => (
          <div key={channel} className="slider-group">
            <label>{channel.toUpperCase()}</label>
            <input
              type="range"
              min="0"
              max="100"
              value={value}
              onChange={(e) => handleChange(channel, parseInt(e.target.value))}
            />
            <span>{value}%</span>
          </div>
        ))}
      </div>
      <div 
        className="color-preview"
        style={{
          backgroundColor: `cmyk(${color.c}% ${color.m}% ${color.y}% ${color.k}%)`
        }}
      />
    </div>
  );
}

export default ColorPicker; 