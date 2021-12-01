type homework = {
    class?: string;
    todo?: string;
    due?: string;
    done?: boolean;
};

type data = {
    [key: string]: homework;
};

type userData = {
    data: data;
    removed: string[]; // removed ids
};

export { homework, data, userData };