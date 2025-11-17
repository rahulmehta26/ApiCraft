import CheckCircle from "../components/icons/check-circle";
import Code from "../components/icons/code";
import Database from "../components/icons/database";

export const variants = {
  default: {
    icon: () => <CheckCircle className="h-5 w-5 text-secondary" />,
    title: "API Response",
    content: () => (
      <div className="space-y-2 font-mono text-xs">
        <div className="flex justify-between">
          <span className="text-muted-foreground">status:</span>
          <span className="text-secondary">200 OK</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">time:</span>
          <span className="text-foreground">142ms</span>
        </div>
      </div>
    ),
  },
  code: {
    icon: () => <Code className="h-5 w-5 text-primary" />,
    title: "Code Snippet",
    content: () => (
      <div className="space-y-1 font-mono text-xs">
        <div className="text-muted-foreground">const data = await</div>
        <div className="text-primary"> fetch(apiUrl)</div>
        <div className="text-muted-foreground"> .then(res {"=>"})</div>
      </div>
    ),
  },
  data: {
    icon: () => <Database className="h-5 w-5 text-secondary" />,
    title: "Data Preview",
    content: () => (
      <div className="space-y-2">
        <div className="h-2 w-full bg-muted rounded" />
        <div className="h-2 w-3/4 bg-muted rounded" />
        <div className="h-2 w-5/6 bg-muted rounded" />
      </div>
    ),
  },
};
