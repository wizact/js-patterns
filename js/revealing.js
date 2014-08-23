var revealContainer = function() {

  var privateName = "";

  function privateNameSetter(name) {
    privateName = name;
  }

  function privateNameGetter() {
    return privateName;
  }

  function nameSetter(name) {
    privateNameSetter(name);
  }

  function nameGetter() {
    return privateNameGetter();
  }

  return {
    setName: nameSetter,
    getName: nameGetter
  };

};
