import React, { useState, useEffect } from "react";
import { ConvertedTime } from "../types";
import "./TimeZoneConverter.css";

const TimeZoneConverter: React.FC = () => {
  // Common time zones
  const timeZones: string[] = [
    "UTC",
    "America/New_York",
    "America/Los_Angeles",
    "Europe/London",
    "Europe/Paris",
    "Asia/Tokyo",
    "Asia/Shanghai",
    "Australia/Sydney",
    "Pacific/Auckland",
    "Asia/Dubai",
    "Asia/Kolkata",
    "America/Chicago",
    "America/Denver",
    "Europe/Berlin",
    "Africa/Cairo",
    "Asia/Singapore",
  ];

  // State
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<string>(
    new Date()
      .toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
      .split(":")
      .slice(0, 2)
      .join(":")
  );
  const [sourceZone, setSourceZone] = useState<string>("UTC");
  const [targetZones, setTargetZones] = useState<string[]>([
    "America/New_York",
    "Europe/London",
    "Asia/Tokyo",
  ]);
  const [convertedTimes, setConvertedTimes] = useState<ConvertedTime[]>([]);
  const [currentDateTime, setCurrentDateTime] = useState<Date>(new Date());

  // Update the current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Convert the time when inputs change
  useEffect(() => {
    handleConvert();
  }, [sourceZone, targetZones, date, time, currentDateTime]);

  // Handle time conversion
  const handleConvert = (): void => {
    try {
      // Parse the input date and time
      const [hours, minutes] = time.split(":").map(Number);
      const selectedDate = new Date(date);
      selectedDate.setHours(hours, minutes, 0, 0);

      // Get the time in UTC
      const sourceDate = new Date(
        selectedDate.toLocaleString("en-US", { timeZone: sourceZone })
      );
      const sourceOffset = getTimezoneOffset(sourceZone, selectedDate);
      const utcTime = new Date(sourceDate.getTime() + sourceOffset);

      // Convert to each target time zone
      const converted: ConvertedTime[] = targetZones.map((zone) => {
        const targetOffset = getTimezoneOffset(zone, selectedDate);
        const targetTime = new Date(utcTime.getTime() - targetOffset);

        const formattedTime = targetTime.toLocaleString("en-US", {
          timeZone: "UTC",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        });

        const formattedDate = targetTime.toLocaleDateString("en-US", {
          timeZone: "UTC",
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
        });

        const abbreviation = getTimezoneAbbreviation(zone, selectedDate);

        return {
          zone,
          time: formattedTime,
          date: formattedDate,
          abbreviation,
        };
      });

      setConvertedTimes(converted);
    } catch (error) {
      console.error("Conversion error:", error);
    }
  };

  // Get timezone offset in milliseconds
  const getTimezoneOffset = (timeZone: string, date: Date): number => {
    const utcDate = new Date(date.toLocaleString("en-US", { timeZone: "UTC" }));
    const tzDate = new Date(date.toLocaleString("en-US", { timeZone }));
    return utcDate.getTime() - tzDate.getTime();
  };

  // Get time zone abbreviation
  const getTimezoneAbbreviation = (timeZone: string, date: Date): string => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone,
      timeZoneName: "short",
    });

    const parts = formatter.formatToParts(date);
    const timeZonePart = parts.find((part) => part.type === "timeZoneName");
    return timeZonePart ? timeZonePart.value : "";
  };

  // Add a new target time zone
  const addTargetZone = (zone: string): void => {
    if (!targetZones.includes(zone) && zone !== sourceZone) {
      setTargetZones([...targetZones, zone]);
    }
  };

  // Remove a target time zone
  const removeTargetZone = (zone: string): void => {
    setTargetZones(targetZones.filter((z) => z !== zone));
  };

  // Format current time for display
  const formatCurrentTime = (zone: string): string => {
    return currentDateTime.toLocaleTimeString("en-US", {
      timeZone: zone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="converter-container">
      <h1 className="converter-title">Time Zone Converter</h1>

      {/* Source Time Selection */}
      <div className="source-time-section">
        <h2 className="section-title">Source Time</h2>

        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Date</label>
            <input
              type="date"
              className="form-input"
              value={
                date instanceof Date ? date.toISOString().split("T")[0] : ""
              }
              onChange={(e) => setDate(new Date(e.target.value))}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Time</label>
            <input
              type="time"
              className="form-input"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Time Zone</label>
            <select
              className="form-select"
              value={sourceZone}
              onChange={(e) => setSourceZone(e.target.value)}
            >
              {timeZones.map((zone) => (
                <option key={zone} value={zone}>
                  {zone.replace("_", " ")} (
                  {getTimezoneAbbreviation(zone, new Date())})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="current-time">
          Current time in {sourceZone}: {formatCurrentTime(sourceZone)}
        </div>
      </div>

      {/* Add Target Time Zone */}
      <div className="target-section">
        <h2 className="section-title">Add Target Time Zone</h2>
        <div>
          <select
            className="form-select"
            onChange={(e) => e.target.value && addTargetZone(e.target.value)}
            value=""
          >
            <option value="">Select a time zone to add</option>
            {timeZones
              .filter(
                (zone) => !targetZones.includes(zone) && zone !== sourceZone
              )
              .map((zone) => (
                <option key={zone} value={zone}>
                  {zone.replace("_", " ")} (
                  {getTimezoneAbbreviation(zone, new Date())})
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Converted Times */}
      <div>
        <h2 className="section-title">Converted Times</h2>

        <div className="time-cards">
          {convertedTimes.map((item, index) => (
            <div key={index} className="time-card">
              <div className="time-card-info">
                <div className="time-card-zone">
                  {item.zone.replace("_", " ")} ({item.abbreviation})
                </div>
                <div className="time-card-time">{item.time}</div>
                <div className="time-card-date">{item.date}</div>
                <div className="time-card-current">
                  Current: {formatCurrentTime(item.zone)}
                </div>
              </div>
              <button
                className="remove-button"
                onClick={() => removeTargetZone(item.zone)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {convertedTimes.length === 0 && (
          <p className="empty-message">
            No target time zones selected. Please add at least one.
          </p>
        )}
      </div>
    </div>
  );
};

export default TimeZoneConverter;
