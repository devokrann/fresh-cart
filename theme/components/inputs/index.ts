import classesPassword from "./Password.module.scss";
import classesSelect from "./Select.module.scss";
import classesText from "./Text.module.scss";
import classesTextarea from "./Textarea.module.scss";
import classesAutocomplete from "./Autocomplete.module.scss";
import classesNumber from "./Number.module.scss";
import classesInput from "./Input.module.scss";

const input = {
	password: { classNames: classesPassword },
	select: { classNames: classesSelect },
	text: { classNames: classesText },
	textarea: { classNames: classesTextarea },
	autocomplete: { classNames: classesAutocomplete },
	number: { classNames: classesNumber },
	input: { classNames: classesInput },
};

export default input;
