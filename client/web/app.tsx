import React from "react";
import Button from "@/components/button";
import Form from "@/components/form";

const App: React.FC = () => {
	return (
		<div>
			<h1>Hello World</h1>
			<Button>Click me</Button>
			<Form fields={[]} />
		</div>
	);
};

export default App;
