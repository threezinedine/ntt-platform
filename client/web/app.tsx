import React from "react";
import Button from "@/components/button";
import Form from "@/components/form";
import { Color } from "./common";

const App: React.FC = () => {
	return (
		<div>
			<h1 className="underline m-3">Hello World Server</h1>
			<Button color={Color.Secondary}>Click me</Button>
			<Form fields={[]} />
		</div>
	);
};

export default App;
