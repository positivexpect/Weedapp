import { useState } from "react";

const API_BASE_URL = "/api"; // Base URL now automatically uses your domain

// Define arrays for select options, checkboxes, etc.
const WEED_TYPES = [
  "Indica",
  "Sativa",
  "Hybrid 50/50",
  "Indica Leaning Hybrid",
  "Sativa Leaning Hybrid",
];

const GROW_STYLES = [
  "Indoor",
  "Outdoor",
  "Greenhouse",
  "Hydroponic",
  "Aeroponic",
  "Sea of Green (SOG)",
  "Screen of Green (SCROG)",
  "Low-Stress Training (LST)",
  "High-Stress Training (HST)",
  "Organic",
  "Living Soil",
  "Coco Coir",
  "Deep Water Culture (DWC)",
  "Vertical Farming",
];

const TERPENES = [
  "Limonene",
  "Myrcene",
  "Pinene",
  "Caryophyllene",
  "Linalool",
  "Humulene",
  "Terpinolene",
  "Ocimene",
  "Geraniol",
  "Nerolidol",
  "Bisabolol",
  "Camphene",
  "Sabinene",
  "Phellandrene",
  "Terpineol",
  "Valencene",
  "Fenchol",
  "Eucalyptol",
  "Guaiol",
  "Isopulegol",
  "Carene",
  "Pulegone",
  "Cymene",
  "Farnesene",
  "Menthol",
  "Phytol",
  "Camphor",
  "Borneol",
  "Isoborneol",
  "Delta-3-Carene",
  "Alpha-Terpinene",
  "Gamma-Terpinene",
  "Alpha-Phellandrene",
  "Beta-Phellandrene",
  "Alpha-Terpineol",
  "Beta-Terpineol",
  "Gamma-Terpineol",
  "Alpha-Humulene",
  "Beta-Caryophyllene",
  "Trans-Nerolidol",
  "Cis-Nerolidol",
  "Alpha-Bisabolol",
  "Beta-Bisabolol",
  "Alpha-Pinene",
  "Beta-Pinene",
  "Alpha-Cedrene",
  "Beta-Cedrene",
  "Alpha-Copaene",
  "Beta-Copaene",
  "Alpha-Gurjunene",
  "Beta-Gurjunene",
  "Alpha-Selinene",
  "Beta-Selinene",
  "Alpha-Eudesmol",
  "Beta-Eudesmol",
  "Gamma-Eudesmol",
  "Alpha-Cadinol",
  "Beta-Cadinol",
  "Gamma-Cadinol",
];

const FLOWER_COLORS = [
  "Light Green",
  "Medium Green",
  "Dark Green",
  "Lime Green",
  "Forest Green",
  "Olive Green",
  "Emerald Green",
  "Purple",
  "Deep Purple",
  "Lavender",
  "Blue",
  "Teal",
  "Orange",
  "Burnt Orange",
  "Pink",
  "Hot Pink",
  "Red",
  "Crimson",
  "Yellow",
  "Golden Yellow",
  "White",
  "Frosty White",
  "Black",
  "Charcoal Black",
  "Brown",
  "Tan",
  "Variegated (Mixed Colors)",
  "Crystaly (Heavy Trichomes)",
  "Milky (Opaque Trichomes)",
  "Calxy (Dense Calyxes)",
  "Hairy (Abundant Pistils)",
  "Frosted (Light Trichome Coverage)",
  "Icy (Extreme Trichome Coverage)",
  "Speckled (Mixed Colors and Trichomes)",
];

const BREAK_STYLES = [
  "Dry and Crumbly",
  "Sticky and Dense",
  "Fluffy and Airy",
  "Moist and Chunky",
  "Resinous and Tacky",
  "Powdery and Fine",
  "Hard and Compact",
  "Spongy and Springy",
  "Leafy and Loose",
  "Crystalline and Brittle",
  "Sticky Icy (Heavy Trichomes)",
  "Moist and Resinous",
  "Dry and Sandy",
  "Fluffy and Sticky",
  "Dense and Chunky",
  "Crackly and Dry",
  "Soft and Pliable",
  "Sticky and Gooey",
  "Dry and Flaky",
  "Moist and Sticky",
];

const TASTED_TERPS = [
  "Citrusy",
  "Earthy",
  "Piney",
  "Spicy",
  "Floral",
  "Sweet",
  "Skunky",
  "Diesel",
  "Cheesy",
  "Berry",
  "Minty",
  "Herbal",
  "Woody",
  "Peppery",
  "Tropical",
  "Vanilla",
  "Coffee",
  "Chocolate",
  "Grape",
  "Lemon",
  "Orange",
  "Lime",
  "Mango",
  "Pineapple",
  "Apple",
  "Pear",
  "Honey",
  "Creamy",
];

const SMOKING_DEVICES = [
  "Joint",
  "Blunt",
  "Glass Pipe",
  "Metal Pipe",
  "Bong",
  "Gravity Bong",
  "Dab Rig",
  "Vaporizer",
  "One-Hitter",
  "Chillum",
  "Hookah",
];

// Define an initial state object for the form data.
const initialFormData = {
  strain: "",
  weedType: "",
  grower: "",
  growStyle: [],
  location: "",
  smokingDevice: "",
  thc: 0,
  terpenes: [],
  terpenePercent: 0,
  flowerColor: [],
  breakStyle: [],
  looks: 0,
  smell: 0,
  taste: 0,
  overall: 0,
  throatHitter: false,
  chestPuncher: false,
  headFeel: false,
  bodyFeel: false,
  tastedTerpsInhale: [],
  tastedTerpsExhale: [],
  notes: "",
  grandChampion: false,
  reviewedBy: "",
  date: "",
  previousRating: 0,
};

export default function NewReviewForm() {
  const [formData, setFormData] = useState(initialFormData);

  // Auto-update overall if looks/smell/taste changes.
  const updateOverallIfNeeded = (newState, changedField) => {
    if (["looks", "smell", "taste"].includes(changedField)) {
      const { looks, smell, taste } = newState;
      const avg = (Number(looks) + Number(smell) + Number(taste)) / 3;
      return {
        ...newState,
        overall: parseFloat(avg.toFixed(1)),
      };
    }
    return newState;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      const newState = { ...prev, [name]: type === "checkbox" ? checked : value };
      return updateOverallIfNeeded(newState, name);
    });
  };

  const handleCheckboxGroupChange = (fieldName, optionValue) => {
    setFormData((prev) => {
      const currentValues = prev[fieldName] || [];
      let newValues;
      if (currentValues.includes(optionValue)) {
        newValues = currentValues.filter((v) => v !== optionValue);
      } else {
        newValues = [...currentValues, optionValue];
      }
      return { ...prev, [fieldName]: newValues };
    });
  };

  const adjustSlider = (fieldName, delta, minVal, maxVal, step = 0.5) => {
    setFormData((prev) => {
      let newVal = Number(prev[fieldName]) + delta;
      if (newVal < minVal) newVal = minVal;
      if (newVal > maxVal) newVal = maxVal;
      newVal = parseFloat(newVal.toFixed(step === 0.1 ? 1 : 1));
      let newState = { ...prev, [fieldName]: newVal };
      newState = updateOverallIfNeeded(newState, fieldName);
      return newState;
    });
  };

  const handleSliderChange = (e, fieldName, step = 0.5) => {
    const newValue = parseFloat(e.target.value);
    setFormData((prev) => {
      let newState = { ...prev, [fieldName]: newValue };
      newState = updateOverallIfNeeded(newState, fieldName);
      return newState;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting form data:", formData);

      const response = await fetch(`${API_BASE_URL}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // Parse the response (if any)
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(
          `Failed: ${response.status} - ${responseData.message || "Unknown error"}`
        );
      }

      console.log("Review submitted successfully:", responseData);
      // Reset the form after a successful submission.
      setFormData(initialFormData);
    } catch (err) {
      console.error("Error submitting review:", err);
    }
  };

  return (
    // Fun stoner-friendly gradient background, plus a semi-transparent form container.
    <div className="min-h-screen bg-gradient-to-br from-green-700 via-purple-600 to-pink-500 p-6 flex justify-center items-center">
      <div className="bg-white/90 backdrop-blur-md shadow-lg rounded-2xl p-6 w-full max-w-4xl">
        <h1 className="text-4xl font-extrabold text-green-900 mb-6 flex items-center gap-2">
          <span>🌿</span>
          New Strain Review
        </h1>

        <form onSubmit={handleSubmit} className="grid gap-4">
          {/* Strain Name */}
          <div>
            <label className="block text-lg font-semibold mb-1">Strain Name</label>
            <input
              name="strain"
              placeholder="Strain Name"
              value={formData.strain}
              onChange={handleChange}
              required
              className="w-full p-2 rounded border border-gray-300"
            />
          </div>

          {/* Weed Type (single-select) */}
          <div>
            <label className="block text-lg font-semibold mb-1">Weed Type</label>
            <select
              name="weedType"
              value={formData.weedType}
              onChange={handleChange}
              required
              className="w-full p-2 rounded border border-gray-300"
            >
              <option value="">Select a weed type</option>
              {WEED_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Grower */}
          <div>
            <label className="block text-lg font-semibold mb-1">Grower</label>
            <input
              name="grower"
              placeholder="Grower"
              value={formData.grower}
              onChange={handleChange}
              required
              className="w-full p-2 rounded border border-gray-300"
            />
          </div>

          {/* Grow Style checkboxes */}
          <div>
            <span className="block text-lg font-semibold mb-1">Grow Style</span>
            <div className="flex flex-wrap gap-2">
              {GROW_STYLES.map((style) => (
                <label key={style} className="flex items-center space-x-1">
                  <input
                    type="checkbox"
                    value={style}
                    checked={formData.growStyle.includes(style)}
                    onChange={() => handleCheckboxGroupChange("growStyle", style)}
                  />
                  <span className="text-sm">{style}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-lg font-semibold mb-1">Location</label>
            <input
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full p-2 rounded border border-gray-300"
            />
          </div>

          {/* Smoking Device (single-select) */}
          <div>
            <label className="block text-lg font-semibold mb-1">Smoking Device</label>
            <select
              name="smokingDevice"
              value={formData.smokingDevice}
              onChange={handleChange}
              className="w-full p-2 rounded border border-gray-300"
            >
              <option value="">Select a device</option>
              {SMOKING_DEVICES.map((device) => (
                <option key={device} value={device}>
                  {device}
                </option>
              ))}
            </select>
          </div>

          {/* THC Slider */}
          <div>
            <label className="block text-lg font-semibold mb-1">
              THC: {formData.thc}%
            </label>
            <div className="flex items-center gap-2 mb-1">
              <button
                type="button"
                onClick={() => adjustSlider("thc", -0.5, 0, 100, 0.5)}
                className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
              >
                ←
              </button>
              <input
                name="thc"
                type="range"
                min="0"
                max="100"
                step="0.5"
                value={formData.thc}
                onChange={(e) => handleSliderChange(e, "thc", 0.5)}
                required
                className="flex-1"
              />
              <button
                type="button"
                onClick={() => adjustSlider("thc", 0.5, 0, 100, 0.5)}
                className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
              >
                →
              </button>
            </div>
            <input
              type="number"
              min="0"
              max="100"
              step="0.5"
              value={formData.thc}
              onChange={(e) => handleSliderChange(e, "thc", 0.5)}
              className="w-20 p-1 rounded border border-gray-300"
            />
          </div>

          {/* Terpenes */}
          <div>
            <span className="block text-lg font-semibold mb-1">Terpenes</span>
            <div className="flex flex-wrap gap-2">
              {TERPENES.map((terp) => (
                <label key={terp} className="flex items-center space-x-1">
                  <input
                    type="checkbox"
                    value={terp}
                    checked={formData.terpenes.includes(terp)}
                    onChange={() => handleCheckboxGroupChange("terpenes", terp)}
                  />
                  <span className="text-sm">{terp}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Terpene % Slider */}
          <div>
            <label className="block text-lg font-semibold mb-1">
              Terpene %: {formData.terpenePercent}%
            </label>
            <div className="flex items-center gap-2 mb-1">
              <button
                type="button"
                onClick={() =>
                  adjustSlider("terpenePercent", -0.5, 0, 100, 0.5)
                }
                className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
              >
                ←
              </button>
              <input
                name="terpenePercent"
                type="range"
                min="0"
                max="100"
                step="0.5"
                value={formData.terpenePercent}
                onChange={(e) => handleSliderChange(e, "terpenePercent", 0.5)}
                required
                className="flex-1"
              />
              <button
                type="button"
                onClick={() =>
                  adjustSlider("terpenePercent", 0.5, 0, 100, 0.5)
                }
                className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
              >
                →
              </button>
            </div>
            <input
              type="number"
              min="0"
              max="100"
              step="0.5"
              value={formData.terpenePercent}
              onChange={(e) => handleSliderChange(e, "terpenePercent", 0.5)}
              className="w-20 p-1 rounded border border-gray-300"
            />
          </div>

          {/* Flower Color */}
          <div>
            <span className="block text-lg font-semibold mb-1">
              Flower Color
            </span>
            <div className="flex flex-wrap gap-2">
              {FLOWER_COLORS.map((color) => (
                <label key={color} className="flex items-center space-x-1">
                  <input
                    type="checkbox"
                    value={color}
                    checked={formData.flowerColor.includes(color)}
                    onChange={() =>
                      handleCheckboxGroupChange("flowerColor", color)
                    }
                  />
                  <span className="text-sm">{color}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Break Style */}
          <div>
            <span className="block text-lg font-semibold mb-1">
              Break Style
            </span>
            <div className="flex flex-wrap gap-2">
              {BREAK_STYLES.map((style) => (
                <label key={style} className="flex items-center space-x-1">
                  <input
                    type="checkbox"
                    value={style}
                    checked={formData.breakStyle.includes(style)}
                    onChange={() =>
                      handleCheckboxGroupChange("breakStyle", style)
                    }
                  />
                  <span className="text-sm">{style}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Looks Slider */}
          <div>
            <label className="block text-lg font-semibold mb-1">
              Looks: {formData.looks}
            </label>
            <div className="flex items-center gap-2 mb-1">
              <button
                type="button"
                onClick={() => adjustSlider("looks", -0.1, 0, 10, 0.1)}
                className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
              >
                ←
              </button>
              <input
                name="looks"
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={formData.looks}
                onChange={(e) => handleSliderChange(e, "looks", 0.1)}
                className="flex-1"
              />
              <button
                type="button"
                onClick={() => adjustSlider("looks", 0.1, 0, 10, 0.1)}
                className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
              >
                →
              </button>
            </div>
            <input
              type="number"
              min="0"
              max="10"
              step="0.1"
              value={formData.looks}
              onChange={(e) => handleSliderChange(e, "looks", 0.1)}
              className="w-20 p-1 rounded border border-gray-300"
            />
          </div>

          {/* Smell Slider */}
          <div>
            <label className="block text-lg font-semibold mb-1">
              Smell: {formData.smell}
            </label>
            <div className="flex items-center gap-2 mb-1">
              <button
                type="button"
                onClick={() => adjustSlider("smell", -0.1, 0, 10, 0.1)}
                className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
              >
                ←
              </button>
              <input
                name="smell"
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={formData.smell}
                onChange={(e) => handleSliderChange(e, "smell", 0.1)}
                className="flex-1"
              />
              <button
                type="button"
                onClick={() => adjustSlider("smell", 0.1, 0, 10, 0.1)}
                className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
              >
                →
              </button>
            </div>
            <input
              type="number"
              min="0"
              max="10"
              step="0.1"
              value={formData.smell}
              onChange={(e) => handleSliderChange(e, "smell", 0.1)}
              className="w-20 p-1 rounded border border-gray-300"
            />
          </div>

          {/* Taste Slider */}
          <div>
            <label className="block text-lg font-semibold mb-1">
              Taste: {formData.taste}
            </label>
            <div className="flex items-center gap-2 mb-1">
              <button
                type="button"
                onClick={() => adjustSlider("taste", -0.1, 0, 10, 0.1)}
                className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
              >
                ←
              </button>
              <input
                name="taste"
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={formData.taste}
                onChange={(e) => handleSliderChange(e, "taste", 0.1)}
                className="flex-1"
              />
              <button
                type="button"
                onClick={() => adjustSlider("taste", 0.1, 0, 10, 0.1)}
                className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
              >
                →
              </button>
            </div>
            <input
              type="number"
              min="0"
              max="10"
              step="0.1"
              value={formData.taste}
              onChange={(e) => handleSliderChange(e, "taste", 0.1)}
              className="w-20 p-1 rounded border border-gray-300"
            />
          </div>

          {/* Overall Slider (auto-updates from looks/smell/taste) */}
          <div>
            <label className="block text-lg font-semibold mb-1">
              Overall: {formData.overall}
            </label>
            <div className="flex items-center gap-2 mb-1">
              <button
                type="button"
                onClick={() => adjustSlider("overall", -0.1, 0, 10, 0.1)}
                className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
              >
                ←
              </button>
              <input
                name="overall"
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={formData.overall}
                onChange={(e) => handleSliderChange(e, "overall", 0.1)}
                className="flex-1"
              />
              <button
                type="button"
                onClick={() => adjustSlider("overall", 0.1, 0, 10, 0.1)}
                className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
              >
                →
              </button>
            </div>
            <input
              type="number"
              min="0"
              max="10"
              step="0.1"
              value={formData.overall}
              onChange={(e) => handleSliderChange(e, "overall", 0.1)}
              className="w-20 p-1 rounded border border-gray-300"
            />
          </div>

          {/* Tasted Terps Inhale */}
          <div>
            <span className="block text-lg font-semibold mb-1">
              Tasted Terps (Inhale)
            </span>
            <div className="flex flex-wrap gap-2">
              {TASTED_TERPS.map((terp) => (
                <label key={terp} className="flex items-center space-x-1">
                  <input
                    type="checkbox"
                    value={terp}
                    checked={formData.tastedTerpsInhale.includes(terp)}
                    onChange={() =>
                      handleCheckboxGroupChange("tastedTerpsInhale", terp)
                    }
                  />
                  <span className="text-sm">{terp}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Tasted Terps Exhale */}
          <div>
            <span className="block text-lg font-semibold mb-1">
              Tasted Terps (Exhale)
            </span>
            <div className="flex flex-wrap gap-2">
              {TASTED_TERPS.map((terp) => (
                <label key={terp} className="flex items-center space-x-1">
                  <input
                    type="checkbox"
                    value={terp}
                    checked={formData.tastedTerpsExhale.includes(terp)}
                    onChange={() =>
                      handleCheckboxGroupChange("tastedTerpsExhale", terp)
                    }
                  />
                  <span className="text-sm">{terp}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Separator Heading */}
          <h2 className="text-2xl font-bold mt-6 text-purple-900">
            How'd it feel?
          </h2>

          {/* Throat Hitter */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="throatHitter"
              checked={formData.throatHitter}
              onChange={handleChange}
            />
            <span className="text-sm">Throat Hitter</span>
          </div>

          {/* Chest Puncher */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="chestPuncher"
              checked={formData.chestPuncher}
              onChange={handleChange}
            />
            <span className="text-sm">Chest Puncher</span>
          </div>

          {/* Head Feel */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="headFeel"
              checked={formData.headFeel}
              onChange={handleChange}
            />
            <span className="text-sm">Head Feel</span>
          </div>

          {/* Body Feel */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="bodyFeel"
              checked={formData.bodyFeel}
              onChange={handleChange}
            />
            <span className="text-sm">Body Feel</span>
          </div>

          {/* Grand Champion */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="grandChampion"
              checked={formData.grandChampion}
              onChange={handleChange}
            />
            <span className="text-sm">Grand Champion</span>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-lg font-semibold mb-1">Notes</label>
            <textarea
              name="notes"
              placeholder="Any extra details..."
              className="w-full p-2 rounded border border-gray-300"
              value={formData.notes}
              onChange={handleChange}
            />
          </div>

          {/* Reviewed By */}
          <div>
            <label className="block text-lg font-semibold mb-1">
              Reviewed By
            </label>
            <input
              name="reviewedBy"
              placeholder="Your Name"
              value={formData.reviewedBy}
              onChange={handleChange}
              className="w-full p-2 rounded border border-gray-300"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-lg font-semibold mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="p-2 rounded border border-gray-300"
            />
          </div>

          {/* Previous Rating Slider */}
          <div>
            <label className="block text-lg font-semibold mb-1">
              Previous Rating: {formData.previousRating}
            </label>
            <div className="flex items-center gap-2 mb-1">
              <button
                type="button"
                onClick={() =>
                  adjustSlider("previousRating", -0.1, 0, 10, 0.1)
                }
                className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
              >
                ←
              </button>
              <input
                name="previousRating"
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={formData.previousRating}
                onChange={(e) =>
                  handleSliderChange(e, "previousRating", 0.1)
                }
                className="flex-1"
              />
              <button
                type="button"
                onClick={() =>
                  adjustSlider("previousRating", 0.1, 0, 10, 0.1)
                }
                className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
              >
                →
              </button>
            </div>
            <input
              type="number"
              min="0"
              max="10"
              step="0.1"
              value={formData.previousRating}
              onChange={(e) => handleSliderChange(e, "previousRating", 0.1)}
              className="w-20 p-1 rounded border border-gray-300"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 px-4 py-2 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-700 shadow-md"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
