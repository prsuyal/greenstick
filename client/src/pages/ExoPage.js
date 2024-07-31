import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsLogoBlack from "../assets/images/logo-black.svg";
import exoLogo from "../assets/images/exo-logo.svg";
import { Helmet } from "react-helmet";
import ReactMarkdown from "react-markdown";
import { FaPencil, FaArrowTurnUp } from "react-icons/fa6";
import exoLogoWhite from "../assets/images/exo-logo-white.svg";
import gsLogoWhite from "../assets/images/logo-white.svg";
import remarkGfm from "remark-gfm";
import DarkModeToggle from "../components/common/DarkModeToggle";

const ExoPage = ({ user }) => {
  const [message, setMessage] = useState("");
  const [responses, setResponses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editMessage, setEditMessage] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const messageEndRef = useRef(null);
  const textareaRef = useRef(null);
  const editTextareaRef = useRef(null);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    adjustTextareaHeight(e.target);
  };

  const handleEditMessageChange = (e) => {
    setEditMessage(e.target.value);
    adjustTextareaHeight(e.target);
  };

  const handleSendMessage = async () => {
    if (!message.trim() && !editMessage.trim()) return;

    if (isEditing && editIndex !== null) {
      const updatedResponses = responses.map((res, index) =>
        index === editIndex
          ? { ...res, message: editMessage, response: "" }
          : res
      );
      setResponses(updatedResponses);
      setIsEditing(false);
      setEditIndex(null);
      setEditMessage("");
    } else {
      setResponses([
        ...responses,
        {
          message,
          response: "",
          time: new Date().toLocaleString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            month: "long",
            day: "numeric",
          }),
        },
      ]);
    }

    setMessage("");
    resetTextareaHeight();

    try {
      const messageToSend = isEditing ? editMessage : message;
      const res = await fetch("http://localhost:3001/api/exo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: messageToSend }),
      });

      if (!res.body) {
        throw new Error("ReadableStream not yet supported in this browser.");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let partialResponse = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        partialResponse += chunk;
        setResponses((prevResponses) =>
          prevResponses.map((resp, index) =>
            index === prevResponses.length - 1
              ? { ...resp, response: resp.response + chunk }
              : resp
          )
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setResponses((prevResponses) =>
        prevResponses.map((resp, index) =>
          index === prevResponses.length - 1
            ? {
                ...resp,
                response: "An error occurred while communicating with Exo.",
              }
            : resp
        )
      );
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const adjustTextareaHeight = (textarea) => {
    textarea.style.height = "50px";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
  };

  const resetTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "50px";
    }
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [responses]);

  useEffect(() => {
    adjustTextareaHeight(textareaRef.current);
  }, []);

  const handleEditClick = (index) => {
    setIsEditing(true);
    setEditIndex(index);
    setEditMessage(responses[index].message);
    setTimeout(() => {
      if (editTextareaRef.current) {
        adjustTextareaHeight(editTextareaRef.current);
      }
    }, 0);
  };

  const handleEditSave = async () => {
    await handleSendMessage();
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditIndex(null);
    setEditMessage("");
  };

  return (
    <>
      <Helmet>
        <title>Exo - Greenstick</title>
      </Helmet>
      <div
        className={`min-h-screen flex flex-col ${
          isDarkMode ? "bg-black text-white" : "bg-white text-black"
        } font-[Poppins]`}
      >
        <div
          className={`fixed top-0 left-0 w-full z-50 px-4 py-2 sm:py-3 ${
            isDarkMode ? "bg-gray-900" : "bg-white border-y"
          }`}
        >
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <img
              src={isDarkMode ? gsLogoWhite : gsLogoBlack}
              alt="Greenstick logo"
              className="h-8 sm:h-10 md:h-12 cursor-pointer"
              onClick={() => navigate("/")}
            />
            <div className="flex items-center">
              <span className="font-[Poppins] mr-4">
                {user ? user.full_name : "Guest"}
              </span>
              <DarkModeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
            </div>
          </div>
        </div>

        <div className="flex-grow flex flex-col items-center px-4 overflow-y-auto mt-16 mb-24">
          {responses.length === 0 ? (
            <div className="flex-grow flex items-center justify-center">
              <img
                src={isDarkMode ? exoLogoWhite : exoLogo}
                alt="Exo"
                className="h-64 w-64"
              />
            </div>
          ) : (
            <div className="w-full max-w-4xl py-4">
              {responses.map((res, index) => (
                <div key={index} className="mb-8">
                  <div className="flex flex-col items-end mb-4 group">
                    <div
                      className={`text-xs mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {res.time}
                    </div>
                    <div className="flex items-center w-full justify-end">
                      {isEditing && editIndex === index ? (
                        <div className="w-full flex items-center">
                          <textarea
                            ref={editTextareaRef}
                            value={editMessage}
                            onChange={handleEditMessageChange}
                            onKeyDown={handleKeyPress}
                            className={`flex-grow p-4 rounded-lg resize-none focus:outline-none ${
                              isDarkMode
                                ? "bg-gray-700 text-gray-300"
                                : "bg-gray-100"
                            }`}
                            style={{ minHeight: "50px", maxHeight: "200px" }}
                          />
                          <button
                            onClick={handleEditSave}
                            className={`ml-2 py-2 px-4 rounded-md flex items-center justify-center bg-black border-2 border-black text-white hover:text-black hover:bg-white transition-colors duration-300`}
                            style={{ width: "100px", height: "40px" }}
                          >
                            Update
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className={`ml-2 py-2 px-4 rounded-md flex items-center justify-center border-2 border-black text-black bg-white hover:text-white hover:bg-black transition-colors duration-300`}
                            style={{ width: "100px", height: "40px" }}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <>
                          <FaPencil
                            className={`mr-2 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                              isDarkMode ? "text-gray-300" : "text-black"
                            }`}
                            onClick={() => handleEditClick(index)}
                            style={{ fontSize: "20px" }} 
                          />
                          <div
                            className={`p-4 rounded-lg max-w-[75%] relative ${
                              isDarkMode ? "bg-gray-700" : "bg-gray-100"
                            }`}
                            style={{ wordBreak: "break-word", borderRadius: "20px" }} 
                          >
                            <ReactMarkdown
                              className={`font-[Poppins] text-base ${
                                isDarkMode ? "text-gray-300" : "text-black"
                              } break-words`}
                              components={{
                                h1: ({ node, ...props }) => (
                                  <h1
                                    className="text-2xl font-bold my-2"
                                    {...props}
                                  />
                                ),
                                h2: ({ node, ...props }) => (
                                  <h2
                                    className="text-xl font-semibold my-2"
                                    {...props}
                                  />
                                ),
                                h3: ({ node, ...props }) => (
                                  <h3 className="text-lg font-medium my-2" {...props} />
                                ),
                                p: ({ node, ...props }) => (
                                  <p
                                    style={{
                                      overflowWrap: "break-word",
                                      wordWrap: "break-word",
                                      hyphens: "auto",
                                    }}
                                    className="my-1"
                                    {...props}
                                  />
                                ),
                              }}
                              remarkPlugins={[remarkGfm]}
                            >
                              {res.message}
                            </ReactMarkdown>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-start items-start">
                    <div className="flex-shrink-0 mt-1">
                      <img
                        src={isDarkMode ? exoLogoWhite : exoLogo}
                        alt="Exo"
                        className="h-8 w-8"
                      />
                    </div>
                    <div
                      className={`flex flex-col ml-4 ${
                        isDarkMode ? "text-gray-300" : "text-gray-900"
                      } w-full`}
                    >
                      <div
                        className={`font-[Poppins] text-sm ${
                          isDarkMode ? "text-gray-300" : "text-gray-900"
                        }`}
                      >
                        {res.time}
                      </div>
                      <div className="flex items-start mt-1">
                        <ReactMarkdown
                          className={`font-[Poppins] text-base ${
                            isDarkMode ? "text-gray-300" : "text-gray-900"
                          }`}
                          components={{
                            h1: ({ node, ...props }) => (
                              <h1 className="text-2xl font-bold my-2" {...props} />
                            ),
                            h2: ({ node, ...props }) => (
                              <h2 className="text-xl font-semibold my-2" {...props} />
                            ),
                            h3: ({ node, ...props }) => (
                              <h3 className="text-lg font-medium my-2" {...props} />
                            ),
                            p: ({ node, ...props }) => (
                              <p
                                style={{
                                  overflowWrap: "break-word",
                                  wordWrap: "break-word",
                                  hyphens: "auto",
                                }}
                                className="my-1"
                                {...props}
                              />
                            ),
                          }}
                          remarkPlugins={[remarkGfm]}
                        >
                          {res.response}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messageEndRef} />
            </div>
          )}
        </div>

        <div
          className={`fixed bottom-0 left-0 right-0 p-4 ${
            isDarkMode ? "bg-gray-900" : "bg-white"
          }`}
        >
          <div className="w-full max-w-4xl mx-auto">
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={message}
                onChange={handleMessageChange}
                onKeyDown={handleKeyPress}
                placeholder="Message Exo 1.0"
                className={`w-full p-4 rounded-lg resize-none pr-10 focus:outline-none ${
                  isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100"
                }`}
                style={{
                  overflow: "hidden",
                  minHeight: "50px",
                  maxHeight: "200px",
                  borderRadius: "15px",
                  paddingTop: "12px",
                  paddingBottom: "12px",
                  boxSizing: "border-box",
                }}
              />
              <button
                onClick={handleSendMessage}
                className={`absolute right-2 bottom-4 font-bold py-2 px-4 flex items-center ${
                  isDarkMode ? "text-gray-300" : "text-gray-500"
                }`}
              >
                <FaArrowTurnUp />
              </button>
            </div>
          </div>
          <p
            className={`text-xs mt-2 text-center ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Exo can make mistakes. Double-check its responses.
          </p>
        </div>
      </div>
    </>
  );
};

export default ExoPage;
