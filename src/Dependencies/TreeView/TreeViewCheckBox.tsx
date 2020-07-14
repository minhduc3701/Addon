import * as React from "react";
import { Checkbox } from "./index.js";
import { Icon } from "../@uifabric/icons/Icon";
import { ItemWrapper, RepoWrapper } from "./CheckBoxStyle";
import { CheckboxPropsExample, CheckBoxState } from "./CheckBoxStyle";
import { TestLanguage } from "../TestLanguage";
import { TreeViewState } from "./TreeView";
import { ITreeViewProps } from "./TreeViewInterface";

export interface OptionsListProps {
  repo: ITreeViewProps[];
  selectedRepo: any;
  onChange: any;
  onChangeParent:any;
  theme?:string;
  parentNode?:ITreeViewProps
  isChecked?:any
  onChangeIsChecked:any
}

class CheckboxBasicExample extends React.Component<
  CheckboxPropsExample,
  CheckBoxState
> {
  constructor(props: CheckboxPropsExample) {
    super(props);
    this.state = {
      checked: false,
      handleCheck: null,
      viewTree: false,
      indeterminate: false,
      selectedRepo: {},
      isChecked: {},
    };
  }
  onHandleCheck = async () => {
    let currentChecked = this.state.checked;
    if (!this.props.isDisable) {
      await this.setState({
        checked: !currentChecked,
      });
    }
    // this.props.getValue &&
    //   this.props.getValue({
    //     isChecked: this.state.checked,
    //     header: this.props.header,
    //     isLastChild: this.props.repo ? false : true,
    //     repo: this.props.repo,
    //   });
  };

  onHandleDisplayTree = () => {
    let currentTreeView = this.state.viewTree;
    this.setState({
      viewTree: !currentTreeView,
    });
  };

  OptionsList = ({parentNode, repo, selectedRepo,isChecked, onChange,onChangeIsChecked,onChangeParent,theme}: OptionsListProps) => {
    const handleCheckboxClicked = async (selectedId: string) => {
      // is currently selected
      if (isChecked[selectedId]) {
        // remove selected key from options list
         isChecked[selectedId].isChecked = true;
      } else {
        // is not currently selected
        isChecked[selectedId] = {isChecked:true};
      }
      // call onChange function given by parent
      await onChangeIsChecked(isChecked);
      onCheckChild(repo,selectedId)
    };

    const onHandleDisplayTree = (selectedId:string) =>{
      // issue : selectedRepo !== isChecked
     if (selectedRepo[selectedId]) {
        delete selectedRepo[selectedId];
      } else {
        selectedRepo[selectedId] = {};
        if (!isChecked[selectedId]) {
          isChecked[selectedId] = {isChecked:false};
        }
      }
      onChange(selectedRepo);
      onChangeIsChecked(isChecked);
    }

    const handleSubOptionsListChange = (
      optionId: string,
      subRepo: ITreeViewProps[]
    ) => {
      // add sub selections to current optionId
      isChecked[optionId] = subRepo;
      onChangeIsChecked(isChecked);
    };

    const onCheckChild = async (repo:ITreeViewProps[],id:string) =>{
      let idSub = null
      let newArr:ITreeViewProps[] = [];
      console.log(repo,id);
     for (let i = 0; i < repo.length; i++) {
       if (repo[i].id === id ) {
         let repoChild = repo[i].repo!;
         console.log(repo[i]);
          for (let j = 0; j < repoChild.length; j++) {
            let repoSub = repoChild[j].repo!;
            isChecked[id] = {...isChecked[id],[repoChild[j].id]:{isChecked:true}}
            onChangeIsChecked(isChecked);
            idSub = repoChild[j].id
            newArr = repoChild
         }
       }
      }
      if (idSub) {
        onCheckChild(newArr,idSub)
      }
    }

    return (
      <div>
        {repo.map((item, index) => {
          return (
            <ul key={index}>
              <ItemWrapper
              theme={{
                darkMode: theme,
              }}
              >
                <Icon
                  onClick={()=>onHandleDisplayTree(item.id)}
                  iconName={selectedRepo[item.id] ? `ChevronDown` : `ChevronRight`}
                  className="icon-rightArrow"
                />
                <Checkbox
                  checked={isChecked[item.id] && isChecked[item.id].isChecked ? true : false}
                  // indeterminate={
                  //   this.state.checked ? false : this.state.indeterminate
                  // }
                  title={item.header}
                  label={item.header}
                  disabled={item.isDisable || false}
                  onChange={() => handleCheckboxClicked(item.id)}
                />
              </ItemWrapper>
              {item.repo && 
                item.repo.length > 0 &&
                selectedRepo[item.id] &&
                this.OptionsList({
                  parentNode:item,
                  repo: item.repo,
                  selectedRepo: selectedRepo[item.id],
                  isChecked: isChecked[item.id],
                  onChange: (subRepo: ITreeViewProps[]) =>
                  handleSubOptionsListChange(item.id, subRepo),
                  onChangeIsChecked: (subRepo: ITreeViewProps[]) =>
                  handleSubOptionsListChange(item.id, subRepo),
                  onChangeParent:(TreeView:boolean) =>{
                    onHandleDisplayTree(item.id)
                  },
                  theme,
                })}
            </ul>
          );
        })}
      </div>
    );
  };

  render() {
    console.log(this.state.isChecked);
    return (
      <div>
        {this.props.data &&
          this.OptionsList({
            repo: this.props.data,
            onChange: (selectedRepo: ITreeViewProps[]) =>
              this.setState({ selectedRepo }),
            onChangeIsChecked: (isChecked: ITreeViewProps[]) =>
              this.setState({ isChecked }),
            selectedRepo: this.state.selectedRepo,
            isChecked: this.state.isChecked,
            onChangeParent:(parentNode:boolean)=>{
              console.log(parentNode);
            },
            theme:this.props.darkMode
            })}
      </div>
    );
  }
}

export default CheckboxBasicExample;
