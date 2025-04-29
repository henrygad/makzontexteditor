import blockCmd from "../../commands/block.cmd";
import { actionsProps } from "../../type";

const Writecode = ({
  getNodesWithinTextEditor,
  handleGlobalChangesOnInputArea
}: actionsProps) => {
  const handleInsertCode = () => {
    blockCmd("code", getNodesWithinTextEditor(), { value: "", style: [] });
    handleGlobalChangesOnInputArea();
  };

  return <>
    <button className="text-base p-1"
      onClick={() => handleInsertCode()}>
      {"{ }"}
    </button>
  </>;
};

export default Writecode;
