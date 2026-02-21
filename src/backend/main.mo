import Text "mo:core/Text";
import Time "mo:core/Time";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import MixinStorage "blob-storage/Mixin";

actor {
  include MixinStorage();

  type ContactSubmission = {
    name : Text;
    email : Text;
    phone : Text;
    projectType : Text;
    message : Text;
    timestamp : Time.Time;
  };

  let submissionsList = List.empty<ContactSubmission>();

  public shared ({ caller }) func submitContact(name : Text, email : Text, phone : Text, projectType : Text, message : Text) : async () {
    let submission : ContactSubmission = {
      name;
      email;
      phone;
      projectType;
      message;
      timestamp = Time.now();
    };
    submissionsList.add(submission);
  };

  public query ({ caller }) func getAllSubmissions() : async [ContactSubmission] {
    submissionsList.toArray();
  };

  public query ({ caller }) func getSubmissionsByProjectType(projectType : Text) : async [ContactSubmission] {
    submissionsList.toArray().filter(func(submission) { submission.projectType == projectType });
  };

  public query ({ caller }) func getSubmissionsByEmail(email : Text) : async [ContactSubmission] {
    submissionsList.toArray().filter(func(submission) { submission.email == email });
  };

  public shared ({ caller }) func deleteSubmission(email : Text, timestamp : Time.Time) : async () {
    let initialSize = submissionsList.size();
    let filteredSubmissions = submissionsList.filter(
      func(submission) {
        (submission.email != email or submission.timestamp != timestamp);
      }
    );
    if (filteredSubmissions.size() == initialSize) {
      Runtime.trap("No matching submission found to delete");
    };
    submissionsList.clear();
    submissionsList.addAll(filteredSubmissions.values());
  };
};
