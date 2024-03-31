import * as React from 'react';
import MainButton from "../MainButton";
import PropTypes from 'prop-types';

export default function SubmitBranchButton(props){
    const moduleNodes = props.currentTree.nodes.filter(node => node.type === 'module')
  
    async function handleSubmit(branch) {
      const disconnectedNodeIdsArr = branch?.nodes?.filter(node => node.is_rooted === false).map(node => node.id) //getDisconnectedNodes(branch);
      
      if (disconnectedNodeIdsArr.length === 0) {
        // no disconnected nodes means submission is valid. Do the save
        props.save({...props.currentTree, branchTitle: props.branchTitle}, "submission")
        return
      }

      // there's a chance we want to push through with the submit even with disconnected skill nodes;
      // so we check module nodes first, then ask the user for confirmation regarding submitting disconnected skill nodes.

      // if there's an invalid module node, discontinue submission
      const areModulesValid = areModuleNodesValid(moduleNodes)
      if (!areModulesValid){ 
        alert('There are hanging module nodes. Please fix this') // !!! switch to RHF eventually and encapsulate all error messages
        return
      }

      // we will get to this point only if the disconnected nodes are skills. We ask the user to confirm if they're okay with submitting those
      validateSkillNodes(disconnectedNodeIdsArr, branch.nodes.filter(node => node.type === 'skill'))
    } 
    
    
      /**
       * return true if there are no hanging module nodes
       * @param {array} moduleNodesArr - module nodes to check for validity
       * @returns {boolean}
       */
      function areModuleNodesValid(moduleNodesArr){
       
        const hasHangingModule =  moduleNodesArr.some(isHanging)
        
        return !hasHangingModule;
      }


      /**
       * return true if the given module node is hanging (ie it has no prerequisite nodes or no objective nodes attached.)
       * @param {object} moduleNode - a module node
       * @returns {boolean}
       */
      function isHanging(moduleNode){
        //!!! a module node is hanging if either:
        // it has no prereqs (ie none of the links have this moduleNode as its source)
        // or it has no objectives (ie none of the the links have this moduleNode as its target)
        
        const moduleHasPrereqs = props.currentTree.links.some(link => link.target === moduleNode.id)
        const moduleHasObjectives = props.currentTree.links.some(link => link.source === moduleNode.id)
      
        return !moduleHasPrereqs || !moduleHasObjectives
      }
    
      function validateSkillNodes(disconnectedNodeIdsArr, skillNodesArr){
      
        alertUserAboutDisconnectedSkillNodes(disconnectedNodeIdsArr, skillNodesArr)
        // !!! once I can incorporate NLP, check for duplicate skill nodes here
      }
    
      // function getDisconnectedNodes(tree){
      //   // create set of sources and targets then compare this set with nodesSet. 
      //   // if nodesSet contains nodes that are not in sources and targets, then those nodes are "disconnected", whereas "hanging" means that a node or branch is not connected to the main tree
      //   const nodesSet = new Set(tree.nodes.map(node=> node.id))
      //   let disconnectedNodesArr = [];
        
      //   console.log(tree)
    
      //   const connectedNodesSet = new Set();
      //   tree.links.forEach(link => {
      //     connectedNodesSet.add(link.source)
      //     connectedNodesSet.add(link.target)
      //   })
    
      //   nodesSet.difference(connectedNodesSet).forEach(item => disconnectedNodesArr.push(item))
      //   return disconnectedNodesArr
      // }
    
      // set up the AlertDialog that informs user of disconnected skill nodes being added to Requests
      function alertUserAboutDisconnectedSkillNodes(disconnectedNodeIdsArr, skillNodesArr){
        let disconnectedSkillNodesArr = []
        
        if (disconnectedNodeIdsArr.length > 0) { 
          disconnectedNodeIdsArr.forEach(disconnectedNodeId => {
          if (skillNodesArr.map(node => node.id).includes(disconnectedNodeId)) {
            disconnectedSkillNodesArr.push(skillNodesArr.filter(node => node.id === disconnectedNodeId)[0])
          }
        })
        }
        if (disconnectedSkillNodesArr.length > 0){
          const nodeDescriptionsArr = disconnectedSkillNodesArr.map(node => node.description)
          props.setDisconnectedSkillNodeDescriptions(nodeDescriptionsArr)
          props.setIsAlertDialogOpen(true)
        }
    
      }

      return  <MainButton onClick={()=>handleSubmit(props.currentTree)}>Submit</MainButton>
}

SubmitBranchButton.propTypes={
    setDisconnectedSkillNodeDescriptions:PropTypes.func,
    setAreSkillNodesValid:PropTypes.func,
    setIsAlertDialogOpen:PropTypes.func,
    disconnectedSkillNodeDescriptions:PropTypes.array,
    state:PropTypes.object,
    currentTree:PropTypes.object,
    branchTitle:PropTypes.string,
    save: PropTypes.func
}