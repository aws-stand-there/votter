import { h } from "preact";
import { useState, useCallback } from "preact/hooks";
import Button from "../../components/button";

const FormField = ({ children }) => <div class="mb-4">{children}</div>;

const FormLabel = ({ children }) => (
  <label class="block text-gray-700 font-bold mb-4 pr-4">{children}</label>
);

const FormInput = ({ placeholder }) => (
  <input
    class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
    placeholder={placeholder}
  />
);

const CreateForm = () => {
  const [options, setOptions] = useState([]);
  const [newOption, setNewOption] = useState("");

  const handleNewOption = useCallback(() => {
    setOptions((prevState) => [...prevState, newOption]);
    setNewOption("");
  }, [newOption]);

  return (
    <div class="container mx-auto mt-4 sm:max-w-md">
      <div class="bg-white sm:shadow-md sm:rounded px-8 pt-6 pb-8 mb-4">
        <FormField>
          <FormLabel>투표 제목</FormLabel>
          <FormInput placeholder="점심 메뉴 투표해주세요 🌭" />
        </FormField>
        <FormField>
          <FormLabel>투표 항목</FormLabel>
          {options.map((option) => (
            <input
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 mb-1 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              value={option}
            />
          ))}
          <input
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            placeholder="새 항목을 입력해주세요."
            value={newOption}
            onInput={(e) => setNewOption(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleNewOption();
              }
              return e;
            }}
          />

          <label class="block text-gray-500 font-bold select-none my-1">
            <input type="checkbox" class="mr-2 leading-tight" />
            <span class="text-sm">선택 항목 추가 허용</span>
          </label>
        </FormField>
        <FormField>
          <FormLabel>투표 마감</FormLabel>
          <input
            type="datetime-local"
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          ></input>
        </FormField>
        <FormField>
          <Button>투표 생성</Button>
        </FormField>
      </div>
    </div>
  );
};

export default CreateForm;
